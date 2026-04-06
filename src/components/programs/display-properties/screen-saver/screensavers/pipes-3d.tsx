"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GRID = 18;
const HALF = GRID / 2;
const PIPE_RADIUS = 0.13;
const JOINT_RADIUS = 0.2;
const CAP_RADIUS = PIPE_RADIUS * 1.1;
const SEGMENT_LENGTH = 1.0;
const TICK_MS = 55;
const MAX_PIPES = 6;
const TURN_PROBABILITY = 0.28;
const RESET_FILL_RATIO = 0.18;
const RESET_HOLD_TICKS = 30;

const PIPE_COLORS: number[] = [
  0xcc2200, 0x00aa33, 0x0055cc, 0xccaa00, 0xcc00aa, 0x00aacc, 0xff6600,
  0x8822cc, 0x00cc88, 0xcc3366,
];

interface Pipe {
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  mat: THREE.MeshPhongMaterial;
  dead: boolean;
}

const DIRS: THREE.Vector3[] = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1),
];

function posKey(x: number, y: number, z: number): number {
  return ((x + 20) << 12) | ((y + 20) << 6) | (z + 20);
}

function perpDirs(d: THREE.Vector3): THREE.Vector3[] {
  return DIRS.filter(
    (o) =>
      !(o.x === d.x && o.y === d.y && o.z === d.z) &&
      !(o.x === -d.x && o.y === -d.y && o.z === -d.z),
  );
}

function inBounds(x: number, y: number, z: number): boolean {
  return (
    x >= -HALF &&
    x <= HALF &&
    y >= -HALF &&
    y <= HALF &&
    z >= -HALF &&
    z <= HALF
  );
}

const UP = new THREE.Vector3(0, 1, 0);
function dirQuat(dir: THREE.Vector3): THREE.Quaternion {
  if (dir.x === 0 && dir.z === 0) {
    const q = new THREE.Quaternion();
    if (dir.y < 0) q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
    return q;
  }
  return new THREE.Quaternion().setFromUnitVectors(UP, dir);
}

export function Pipes3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current!;
    let W = container.clientWidth;
    let H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200);
    const CAM_R = GRID * 1.35;
    let camAngle = Math.random() * Math.PI * 2;

    function updateCamera() {
      camera.position.set(
        Math.cos(camAngle) * CAM_R,
        GRID * 0.35 + Math.sin(camAngle * 0.4) * GRID * 0.1,
        Math.sin(camAngle) * CAM_R,
      );
      camera.lookAt(0, 0, 0);
    }
    updateCamera();

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(2, 4, 3);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x8888cc, 0.3);
    fill.position.set(-2, -1, -3);
    scene.add(fill);

    const segGeo = new THREE.CylinderGeometry(
      PIPE_RADIUS,
      PIPE_RADIUS,
      SEGMENT_LENGTH,
      10,
      1,
    );
    const jntGeo = new THREE.SphereGeometry(JOINT_RADIUS, 10, 8);
    const capGeo = new THREE.SphereGeometry(CAP_RADIUS, 8, 6);

    const matCache = new Map<number, THREE.MeshPhongMaterial>();
    function getMat(color: number): THREE.MeshPhongMaterial {
      if (!matCache.has(color)) {
        matCache.set(
          color,
          new THREE.MeshPhongMaterial({
            color,
            shininess: 70,
            specular: 0x444444,
          }),
        );
      }
      return matCache.get(color)!;
    }

    const occupied = new Set<number>();
    let pipes: Pipe[] = [];
    let meshes: THREE.Mesh[] = [];
    let resetHold = 0;
    const totalCells = GRID * GRID * GRID;

    function addMesh(
      geo: THREE.BufferGeometry,
      mat: THREE.MeshPhongMaterial,
      x: number,
      y: number,
      z: number,
      quat?: THREE.Quaternion,
    ): THREE.Mesh {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      if (quat) mesh.quaternion.copy(quat);
      scene.add(mesh);
      meshes.push(mesh);
      return mesh;
    }

    function clearScene() {
      for (const m of meshes) scene.remove(m);
      meshes = [];
      occupied.clear();
      pipes = [];
    }

    function spawnPipe(): Pipe | null {
      const color = PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)];
      const mat = getMat(color);
      let sx = 0,
        sy = 0,
        sz = 0,
        attempts = 0;

      do {
        sx = Math.floor(Math.random() * GRID) - HALF;
        sy = Math.floor(Math.random() * GRID) - HALF;
        sz = Math.floor(Math.random() * GRID) - HALF;
        attempts++;
      } while (occupied.has(posKey(sx, sy, sz)) && attempts < 40);

      if (attempts >= 40) return null;

      occupied.add(posKey(sx, sy, sz));
      addMesh(capGeo, mat, sx, sy, sz);

      return {
        pos: new THREE.Vector3(sx, sy, sz),
        dir: DIRS[Math.floor(Math.random() * 6)],
        mat,
        dead: false,
      };
    }

    function initPipes() {
      for (let i = 0; i < 3; i++) {
        const p = spawnPipe();
        if (p) pipes.push(p);
      }
    }

    initPipes();

    function stepPipe(pipe: Pipe) {
      if (pipe.dead) return;
      const { pos, mat } = pipe;

      const wantTurn = Math.random() < TURN_PROBABILITY;
      let pool = wantTurn ? perpDirs(pipe.dir) : [pipe.dir];

      pool = pool.filter((d) => {
        const nx = pos.x + d.x,
          ny = pos.y + d.y,
          nz = pos.z + d.z;
        return inBounds(nx, ny, nz) && !occupied.has(posKey(nx, ny, nz));
      });

      if (pool.length === 0) {
        pool = DIRS.filter((d) => {
          const nx = pos.x + d.x,
            ny = pos.y + d.y,
            nz = pos.z + d.z;
          return inBounds(nx, ny, nz) && !occupied.has(posKey(nx, ny, nz));
        });
      }

      if (pool.length === 0) {
        addMesh(capGeo, mat, pos.x, pos.y, pos.z);
        pipe.dead = true;
        return;
      }

      const newDir = pool[Math.floor(Math.random() * pool.length)];
      const nx = pos.x + newDir.x;
      const ny = pos.y + newDir.y;
      const nz = pos.z + newDir.z;

      const turning =
        newDir.x !== pipe.dir.x ||
        newDir.y !== pipe.dir.y ||
        newDir.z !== pipe.dir.z;
      if (turning) addMesh(jntGeo, mat, pos.x, pos.y, pos.z);

      addMesh(
        segGeo,
        mat,
        pos.x + newDir.x * 0.5,
        pos.y + newDir.y * 0.5,
        pos.z + newDir.z * 0.5,
        dirQuat(newDir),
      );

      occupied.add(posKey(nx, ny, nz));
      pipe.pos = new THREE.Vector3(nx, ny, nz);
      pipe.dir = newDir;
    }

    let rafId: number;
    let lastTick = 0;

    function animate(ts: number) {
      rafId = requestAnimationFrame(animate);

      camAngle += 0.0012;
      updateCamera();

      if (ts - lastTick > TICK_MS) {
        lastTick = ts;

        const allDead = pipes.every((p) => p.dead);
        const fillRatio = occupied.size / totalCells;

        if (allDead || fillRatio > RESET_FILL_RATIO) {
          resetHold++;
          if (resetHold > RESET_HOLD_TICKS) {
            clearScene();
            initPipes();
            resetHold = 0;
          }
        } else {
          if (pipes.length < MAX_PIPES && Math.random() < 0.04) {
            const p = spawnPipe();
            if (p) pipes.push(p);
          }
          pipes.forEach(stepPipe);
        }
      }

      renderer.render(scene, camera);
    }

    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      W = container.clientWidth;
      H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      clearScene();
      segGeo.dispose();
      jntGeo.dispose();
      capGeo.dispose();
      matCache.forEach((m) => m.dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    />
  );
}
