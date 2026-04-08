import type * as THREE from "three";

export interface ChunkGenerationResult {
  g: Uint8Array[];
  spawns: Array<readonly [number, number]>;
}

export interface ChunkData {
  grid: Uint8Array[];
  group: THREE.Group;
  chunkEnemies: EnemyEntity[];
}

export interface EnemyEntity {
  mesh: THREE.Mesh;
  hp: number;
  maxHp: number;
  dead: boolean;
  atkCd: number;
  chunkKey: string;
  speed: number;
  damage: number;
}

/** Maps directly to sprite-sheet rows/columns. */
export type GunAnimState =
  | "idle" // Row 1 Col 0 — POV keyboard at rest
  | "fire" // Row 1 Col 1 — muzzle flash + floppy launch
  | "reload0" // Row 2 Col 0 — raise keyboard, preparing
  | "reload1" // Row 2 Col 1 — hand inserts floppy disk
  | "reload2"; // Row 2 Col 2 — seat floppy, lower

export interface HUDState {
  hp: number;
  ammo: number;
  kills: number;
  score: number;
  difficulty: number;
  battery: number;
  flashlightOn: boolean;
  reloading: boolean;
}

export type FlashType = "damage" | "muzzle";
export type GamePhase = "start" | "playing" | "dead";

export interface GameCallbacks {
  onHUDUpdate: (state: HUDState) => void;
  onFlash: (type: FlashType, durationMs: number) => void;
  onGunStateChange: (state: GunAnimState) => void;
  onGameOver: () => void;
  onMouseActiveChange: (active: boolean) => void;
}
