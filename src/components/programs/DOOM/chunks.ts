import { CHUNK } from "./constants";
import { mkRng, hRow, vCol } from "./rng";
import type { ChunkGenerationResult } from "./types";

/**
 * Generate a 16×16 grid chunk at chunk-coordinates (cx, cz).
 * Difficulty controls how many enemy spawn points are embedded.
 */
export function genChunk(
  cx: number,
  cz: number,
  difficulty: number,
): ChunkGenerationResult {
  const rng = mkRng((cx * 73856093) ^ (cz * 19349663));
  const N = CHUNK,
    H = N >> 1;
  const g: Uint8Array[] = Array.from({ length: N }, () =>
    new Uint8Array(N).fill(1),
  );

  const L = hRow(cx - 1, cz),
    R = hRow(cx, cz);
  const T = vCol(cx, cz - 1),
    B = vCol(cx, cz);

  for (let c = 0; c < H; c++) g[L][c] = 0;
  for (let c = H; c < N; c++) g[R][c] = 0;
  for (let r = Math.min(L, R); r <= Math.max(L, R); r++) g[r][H] = 0;
  for (let r = 0; r < H; r++) g[r][T] = 0;
  for (let r = H; r < N; r++) g[r][B] = 0;
  for (let c = Math.min(T, B); c <= Math.max(T, B); c++) g[H][c] = 0;

  const rooms: Array<[number, number]> = [];
  const numRooms = Math.floor(rng() * 3) + 2;
  for (let i = 0; i < numRooms; i++) {
    const w = Math.floor(rng() * 5) + 3,
      h = Math.floor(rng() * 5) + 3;
    const x = Math.floor(rng() * (N - w - 2)) + 1;
    const z = Math.floor(rng() * (N - h - 2)) + 1;
    for (let rr = z; rr < z + h; rr++)
      for (let cc = x; cc < x + w; cc++) g[rr][cc] = 0;
    rooms.push([z + (h >> 1), x + (w >> 1)]);
  }

  for (let i = 0; i + 1 < rooms.length; i++) {
    let [ar, ac] = rooms[i];
    const [br, bc] = rooms[i + 1];
    while (ac !== bc) {
      g[ar][ac] = 0;
      ac += ac < bc ? 1 : -1;
    }
    while (ar !== br) {
      g[ar][ac] = 0;
      ar += ar < br ? 1 : -1;
    }
  }

  if (cx === 0 && cz === 0) {
    for (let r = H - 2; r <= H + 2; r++)
      for (let c = H - 2; c <= H + 2; c++)
        if (r > 0 && r < N - 1 && c > 0 && c < N - 1) g[r][c] = 0;
  }

  const maxSpawns = Math.min(2 + Math.floor(difficulty * 1.4), 9);
  const spawns: Array<readonly [number, number]> = [];
  for (let i = 0, tries = 0; i < maxSpawns && tries < 35; tries++) {
    const sr = Math.floor(rng() * (N - 4)) + 2;
    const sc = Math.floor(rng() * (N - 4)) + 2;
    if (g[sr][sc] === 0) {
      spawns.push([sr, sc] as const);
      i++;
    }
  }

  return { g, spawns };
}
