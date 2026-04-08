"use client";
import * as THREE from "three";
import { GameAudio } from "./audio";
import { buildBSOD, buildSplatter, buildWall, buildFloor } from "./textures";
import { genChunk } from "./chunks";
import {
  CELL,
  WALL_H,
  PL_H,
  PL_SPD,
  ROT_SPD,
  BASE_E_SPD,
  BASE_E_DMG,
  BASE_E_HP,
  B_DMG,
  SHOOT_CD,
  MELEE_R,
  MAX_AMMO,
  CHUNK,
  LOAD_R,
  MAX_ENEMIES,
  DIFFICULTY_INTERVAL,
  MAX_DIFFICULTY,
  BATTERY_MAX,
  BATTERY_DRAIN,
  BATTERY_RECHARGE,
  BATTERY_FLICKER_LO,
  RELOAD_PHASE0_END,
  RELOAD_PHASE1_END,
  RELOAD_PHASE2_END,
} from "./constants";
import type {
  EnemyEntity,
  ChunkData,
  GameCallbacks,
  HUDState,
  GunAnimState,
} from "./types";

interface MutableGS {
  hp: number;
  ammo: number;
  kills: number;
  score: number;
}

export class GameEngine {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private torch!: THREE.PointLight;
  private spotlight!: THREE.SpotLight;
  private spotlightTarget!: THREE.Object3D;

  private wallGeo!: THREE.BoxGeometry;
  private wallMat!: THREE.MeshLambertMaterial;
  private floorMat!: THREE.MeshLambertMaterial;
  private ceilMat!: THREE.MeshLambertMaterial;
  private chunkFloorGeo!: THREE.PlaneGeometry;
  private chunkCeilGeo!: THREE.PlaneGeometry;
  private bsodGeo!: THREE.PlaneGeometry;
  private bsodMat!: THREE.MeshBasicMaterial;
  private splatterMat!: THREE.SpriteMaterial;

  private chunks: Map<string, ChunkData> = new Map();
  private enemies: EnemyEntity[] = [];

  private yaw = 0;
  private pitch = 0;
  private walkT = 0;
  private keys: Record<string, boolean> = {};
  private mouseActive = false;

  private gs: MutableGS = { hp: 100, ammo: MAX_AMMO, kills: 0, score: 0 };
  private shootCd = 0;
  private gameOver = false;
  private difficulty = 0;
  private startTime = 0;

  private flashlightOn = true;
  private battery = BATTERY_MAX;

  private reloading = false;
  private reloadTimer = 0;
  private reloadPhase: 0 | 1 | 2 = 0;

  private mounted = true;
  private animId = 0;
  private prevTime = 0;
  private raycaster = new THREE.Raycaster();

  private audio: GameAudio;
  private callbacks: GameCallbacks;

  constructor(
    private el: HTMLElement,
    callbacks: GameCallbacks,
  ) {
    this.callbacks = callbacks;
    this.audio = new GameAudio();
    this._setupRenderer();
    this._setupLighting();
    this._setupMaterials();
  }

  start(): void {
    this.audio.init();
    this.startTime = Date.now();
    const H2 = CHUNK >> 1;
    this.camera.position.set(H2 * CELL + CELL / 2, PL_H, H2 * CELL + CELL / 2);
    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("click", this._onClick);
    document.addEventListener("keydown", this._onKeyDown);
    document.addEventListener("keyup", this._onKeyUp);
    window.addEventListener("resize", this._onResize);
    this.prevTime = performance.now();
    this._loop();
  }

  stop(): void {
    this.mounted = false;
    cancelAnimationFrame(this.animId);
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("click", this._onClick);
    document.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("keyup", this._onKeyUp);
    window.removeEventListener("resize", this._onResize);
    this.audio.stop();
    this.renderer.dispose();
    if (this.el.contains(this.renderer.domElement))
      this.el.removeChild(this.renderer.domElement);
  }

  setMouseActive(v: boolean): void {
    this.mouseActive = v;
    this.callbacks.onMouseActiveChange(v);
  }

  toggleFlashlight(): void {
    if (!this.flashlightOn && this.battery <= 0) return;
    this.flashlightOn = !this.flashlightOn;
    this.spotlight.intensity = this.flashlightOn ? 8 : 0;
    this._emitHUD();
  }

  private _setupRenderer(): void {
    const W = this.el.clientWidth,
      H = this.el.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);
    this.scene.fog = new THREE.Fog(0x000000, 8, 28);
    this.camera = new THREE.PerspectiveCamera(70, W / H, 0.05, 60);
    this.camera.rotation.order = "YXZ";
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.el.appendChild(this.renderer.domElement);
  }

  private _setupLighting(): void {
    this.scene.add(new THREE.AmbientLight(0x223044, 0.55));
    this.torch = new THREE.PointLight(0x2244aa, 1.0, 10, 1.8);
    this.scene.add(this.torch);
    this.spotlight = new THREE.SpotLight(
      0xddeeff,
      8,
      26,
      Math.PI / 7,
      0.4,
      1.2,
    );
    this.spotlightTarget = new THREE.Object3D();
    this.scene.add(this.spotlight);
    this.scene.add(this.spotlightTarget);
    this.spotlight.target = this.spotlightTarget;
  }

  private _setupMaterials(): void {
    this.wallGeo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
    this.wallMat = new THREE.MeshLambertMaterial({ map: buildWall() });
    const ft = buildFloor();
    ft.repeat.set(4, 4);
    this.floorMat = new THREE.MeshLambertMaterial({ map: ft });
    this.ceilMat = new THREE.MeshLambertMaterial({ color: 0x060810 });
    this.chunkFloorGeo = new THREE.PlaneGeometry(CHUNK * CELL, CHUNK * CELL);
    this.chunkCeilGeo = new THREE.PlaneGeometry(CHUNK * CELL, CHUNK * CELL);
    this.bsodGeo = new THREE.PlaneGeometry(1.4, 1.4);
    this.bsodMat = new THREE.MeshBasicMaterial({
      map: buildBSOD(),
      side: THREE.DoubleSide,
    });
    this.splatterMat = new THREE.SpriteMaterial({
      map: buildSplatter(),
      transparent: true,
      opacity: 0.9,
    });
  }

  private _getCell(wx: number, wz: number): number {
    const cx = Math.floor(wx / (CHUNK * CELL)),
      cz = Math.floor(wz / (CHUNK * CELL));
    const ch = this.chunks.get(`${cx},${cz}`);
    if (!ch) return 1;
    const col = Math.floor((wx - cx * CHUNK * CELL) / CELL);
    const row = Math.floor((wz - cz * CHUNK * CELL) / CELL);
    if (row < 0 || row >= CHUNK || col < 0 || col >= CHUNK) return 1;
    return ch.grid[row][col];
  }

  private _isWall(wx: number, wz: number, r = 0.42): boolean {
    return !!(
      this._getCell(wx - r, wz - r) ||
      this._getCell(wx + r, wz - r) ||
      this._getCell(wx - r, wz + r) ||
      this._getCell(wx + r, wz + r)
    );
  }

  private _loadChunk(cx: number, cz: number): void {
    const key = `${cx},${cz}`;
    if (this.chunks.has(key)) return;
    const { g: grid, spawns } = genChunk(cx, cz, this.difficulty);
    const ox = cx * CHUNK * CELL,
      oz = cz * CHUNK * CELL;
    const group = new THREE.Group();

    for (let row = 0; row < CHUNK; row++)
      for (let col = 0; col < CHUNK; col++) {
        if (!grid[row][col]) continue;
        const m = new THREE.Mesh(this.wallGeo, this.wallMat);
        m.position.set(
          ox + col * CELL + CELL / 2,
          WALL_H / 2,
          oz + row * CELL + CELL / 2,
        );
        group.add(m);
      }
    const fl = new THREE.Mesh(this.chunkFloorGeo, this.floorMat);
    fl.rotation.x = -Math.PI / 2;
    fl.position.set(ox + (CHUNK * CELL) / 2, 0, oz + (CHUNK * CELL) / 2);
    group.add(fl);
    const cl = new THREE.Mesh(this.chunkCeilGeo, this.ceilMat);
    cl.rotation.x = Math.PI / 2;
    cl.position.set(ox + (CHUNK * CELL) / 2, WALL_H, oz + (CHUNK * CELL) / 2);
    group.add(cl);
    this.scene.add(group);

    const eHp = BASE_E_HP + this.difficulty * 25;
    const eSpd = BASE_E_SPD * (1 + this.difficulty * 0.18);
    const eDmg = BASE_E_DMG + this.difficulty * 3;
    const chunkEnemies: EnemyEntity[] = [];

    for (const [sr, sc] of spawns) {
      const ex = ox + sc * CELL + CELL / 2,
        ez = oz + sr * CELL + CELL / 2;
      const dx = ex - this.camera.position.x,
        dz = ez - this.camera.position.z;
      if (dx * dx + dz * dz < (CELL * 8) ** 2) continue;
      if (this.enemies.length >= MAX_ENEMIES) break;
      const mesh = new THREE.Mesh(this.bsodGeo, this.bsodMat);
      mesh.position.set(ex, PL_H, ez);
      this.scene.add(mesh);
      const e: EnemyEntity = {
        mesh,
        hp: eHp,
        maxHp: eHp,
        dead: false,
        atkCd: Math.random() * 0.8,
        chunkKey: key,
        speed: eSpd,
        damage: eDmg,
      };
      chunkEnemies.push(e);
      this.enemies.push(e);
    }
    this.chunks.set(key, { grid, group, chunkEnemies });
  }

  private _unloadChunk(cx: number, cz: number): void {
    const key = `${cx},${cz}`;
    const ch = this.chunks.get(key);
    if (!ch) return;
    this.scene.remove(ch.group);
    for (const e of ch.chunkEnemies) {
      if (!e.dead) this.scene.remove(e.mesh);
      const idx = this.enemies.indexOf(e);
      if (idx >= 0) this.enemies.splice(idx, 1);
    }
    this.chunks.delete(key);
  }

  private _updateChunks(): void {
    const pcx = Math.floor(this.camera.position.x / (CHUNK * CELL));
    const pcz = Math.floor(this.camera.position.z / (CHUNK * CELL));
    for (let dz = -LOAD_R; dz <= LOAD_R; dz++)
      for (let dx = -LOAD_R; dx <= LOAD_R; dx++)
        this._loadChunk(pcx + dx, pcz + dz);
    for (const [key] of this.chunks) {
      const [ccx, ccz] = key.split(",").map(Number);
      if (Math.abs(ccx - pcx) > LOAD_R + 1 || Math.abs(ccz - pcz) > LOAD_R + 1)
        this._unloadChunk(ccx, ccz);
    }
  }

  private _updateDifficulty(): void {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const nd = Math.min(
      Math.floor(elapsed / DIFFICULTY_INTERVAL),
      MAX_DIFFICULTY,
    );
    if (nd !== this.difficulty) {
      this.difficulty = nd;
      if (this.scene.fog instanceof THREE.Fog)
        this.scene.fog.far = Math.max(16, 28 - nd * 1.2);
    }
  }

  private _startReload(): void {
    if (this.reloading || this.gs.ammo === MAX_AMMO) return;
    this.reloading = true;
    this.reloadTimer = 0;
    this.reloadPhase = 0;
    this.callbacks.onGunStateChange("reload0");
    this._emitHUD();
  }

  private _tickReload(dt: number): void {
    if (!this.reloading) return;
    this.reloadTimer += dt;

    if (this.reloadPhase === 0 && this.reloadTimer >= RELOAD_PHASE0_END) {
      this.reloadPhase = 1;
      this.callbacks.onGunStateChange("reload1");
    } else if (
      this.reloadPhase === 1 &&
      this.reloadTimer >= RELOAD_PHASE1_END
    ) {
      this.reloadPhase = 2;
      this.callbacks.onGunStateChange("reload2");
    } else if (
      this.reloadPhase === 2 &&
      this.reloadTimer >= RELOAD_PHASE2_END
    ) {
      this.reloading = false;
      this.gs.ammo = MAX_AMMO;
      this.callbacks.onGunStateChange("idle");
      this._emitHUD();
    }
  }

  private _doShoot(): void {
    if (
      this.reloading ||
      this.shootCd > 0 ||
      this.gs.ammo <= 0 ||
      this.gameOver
    )
      return;
    this.gs.ammo--;
    this.shootCd = SHOOT_CD;
    this.audio.shot();
    this.callbacks.onFlash("muzzle", 90);
    this.callbacks.onGunStateChange("fire");
    setTimeout(() => {
      if (this.mounted && !this.reloading)
        this.callbacks.onGunStateChange("idle");
    }, 130);

    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const meshes = this.enemies.filter((e) => !e.dead).map((e) => e.mesh);
    const hits = this.raycaster.intersectObjects(meshes);
    if (hits.length > 0) {
      const e = this.enemies.find((e) => e.mesh === hits[0].object);
      if (e && !e.dead) {
        e.hp -= B_DMG;
        if (e.hp <= 0) {
          e.dead = true;
          this.scene.remove(e.mesh);
          this.audio.die();
          const sp = new THREE.Sprite(this.splatterMat.clone());
          sp.scale.set(1.4, 1.4, 1);
          sp.position.copy(e.mesh.position);
          sp.position.y = 0.02;
          this.scene.add(sp);
          this.gs.kills++;
          this.gs.score += 150 + this.difficulty * 50;
        } else {
          this.gs.score += 15;
        }
      }
    }
    this._emitHUD();
  }

  private _emitHUD(): void {
    const s: HUDState = {
      ...this.gs,
      difficulty: this.difficulty,
      battery: Math.round(this.battery),
      flashlightOn: this.flashlightOn,
      reloading: this.reloading,
    };
    this.callbacks.onHUDUpdate(s);
  }

  private _onMouseMove = (e: MouseEvent): void => {
    if (!this.mouseActive) return;
    this.yaw -= e.movementX * ROT_SPD;
    this.pitch = Math.max(
      -Math.PI / 2.6,
      Math.min(Math.PI / 2.6, this.pitch - e.movementY * ROT_SPD),
    );
  };

  private _onClick = (): void => {
    if (!this.mouseActive) this.setMouseActive(true);
    else this._doShoot();
  };

  private _onKeyDown = (e: KeyboardEvent): void => {
    this.keys[e.code] = true;
    if (e.code === "Escape") this.setMouseActive(false);
    if (e.code === "KeyF") this.toggleFlashlight();
    if (e.code === "Space" || e.code === "KeyE") this._doShoot();
    if (e.code === "KeyR") this._startReload();
  };

  private _onKeyUp = (e: KeyboardEvent): void => {
    this.keys[e.code] = false;
  };

  private _onResize = (): void => {
    const W = this.el.clientWidth,
      H = this.el.clientHeight;
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H);
  };

  private _loop = (): void => {
    if (!this.mounted) return;
    this.animId = requestAnimationFrame(this._loop);
    const now = performance.now(),
      dt = Math.min((now - this.prevTime) / 1000, 0.05);
    this.prevTime = now;

    if (this.gs.hp <= 0 && !this.gameOver) {
      this.gameOver = true;
      setTimeout(() => this.callbacks.onGameOver(), 700);
      return;
    }
    if (this.gameOver) return;

    this.shootCd = Math.max(0, this.shootCd - dt);
    this._updateDifficulty();
    this._tickReload(dt);

    const fwd = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const rgt = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    let mx = 0,
      mz = 0;
    if (this.keys["KeyW"] || this.keys["ArrowUp"]) {
      mx += fwd.x;
      mz += fwd.z;
    }
    if (this.keys["KeyS"] || this.keys["ArrowDown"]) {
      mx -= fwd.x;
      mz -= fwd.z;
    }
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) {
      mx -= rgt.x;
      mz -= rgt.z;
    }
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) {
      mx += rgt.x;
      mz += rgt.z;
    }
    const ml = Math.sqrt(mx * mx + mz * mz);
    let moving = false;
    if (ml > 0) {
      moving = true;
      const step = (PL_SPD * dt) / ml;
      const nx = this.camera.position.x + mx * step,
        nz = this.camera.position.z + mz * step;
      if (!this._isWall(nx, this.camera.position.z))
        this.camera.position.x = nx;
      if (!this._isWall(this.camera.position.x, nz))
        this.camera.position.z = nz;
    }
    this.walkT += dt * (moving ? 8 : 2);
    this.camera.position.y =
      PL_H + Math.sin(this.walkT) * (moving ? 0.05 : 0.008);
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    this.torch.position.copy(this.camera.position);
    this.torch.intensity =
      1.0 + Math.sin(now * 0.005) * 0.2 + Math.random() * 0.08;

    if (this.flashlightOn) {
      const prev = this.battery;
      this.battery = Math.max(0, this.battery - BATTERY_DRAIN * dt);
      if (this.battery <= 0) {
        this.flashlightOn = false;
        this.spotlight.intensity = 0;
        this._emitHUD();
      } else if (Math.floor(this.battery) !== Math.floor(prev)) {
        this._emitHUD();
      }
    } else {
      const prev = this.battery;
      this.battery = Math.min(
        BATTERY_MAX,
        this.battery + BATTERY_RECHARGE * dt,
      );
      if (Math.floor(this.battery) !== Math.floor(prev)) this._emitHUD();
    }

    this.spotlight.position.copy(this.camera.position);
    const fDir = new THREE.Vector3(
      -Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      -Math.cos(this.yaw) * Math.cos(this.pitch),
    );
    this.spotlightTarget.position
      .copy(this.camera.position)
      .addScaledVector(fDir, 5);
    this.spotlightTarget.updateMatrixWorld();
    if (this.flashlightOn) {
      const lo = this.battery < BATTERY_FLICKER_LO;
      const flicker = lo
        ? (Math.random() > 0.08 ? 1 : 0) *
          (0.4 + (this.battery / BATTERY_FLICKER_LO) * 0.6)
        : 1;
      this.spotlight.intensity = 8 * flicker * (this.battery / BATTERY_MAX);
    }

    this._updateChunks();

    for (const e of this.enemies) {
      if (e.dead) continue;
      e.mesh.lookAt(
        this.camera.position.x,
        e.mesh.position.y,
        this.camera.position.z,
      );
      const dx = this.camera.position.x - e.mesh.position.x;
      const dz = this.camera.position.z - e.mesh.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > MELEE_R) {
        const spd = e.speed * dt;
        const nx = e.mesh.position.x + (dx / dist) * spd;
        const nz = e.mesh.position.z + (dz / dist) * spd;
        if (!this._getCell(nx, e.mesh.position.z)) e.mesh.position.x = nx;
        if (!this._getCell(e.mesh.position.x, nz)) e.mesh.position.z = nz;
      } else {
        e.atkCd -= dt;
        if (e.atkCd <= 0) {
          this.gs.hp = Math.max(0, this.gs.hp - e.damage);
          e.atkCd = 0.65 + Math.random() * 0.3;
          this.audio.hurt();
          this.callbacks.onFlash("damage", 130);
          this._emitHUD();
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  };
}
