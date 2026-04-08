import { CHUNK } from "./constants";

export function mkRng(seed: number): () => number {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return (): number => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b) >>> 0;
    s = (s ^ (s >>> 16)) >>> 0;
    return s / 0x100000000;
  };
}

export function hRow(cx: number, cz: number): number {
  const r = mkRng((cx * 982451653) ^ (cz * 123456791));
  return Math.floor(r() * (CHUNK - 5)) + 3;
}

export function vCol(cx: number, cz: number): number {
  const r = mkRng((cx * 123456791) ^ (cz * 982451653));
  return Math.floor(r() * (CHUNK - 5)) + 3;
}
