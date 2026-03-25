import { Hex } from 'ox';

export function canEncodeTaskContent(value: string) {
  try {
    Hex.fromString(value.trim(), { size: 32 });
    return value.trim().length > 0;
  } catch {
    return false;
  }
}

export function encodeTaskContent(value: string) {
  return Hex.fromString(value.trim(), { size: 32 }) as `0x${string}`;
}

export function decodeTaskContent(value: `0x${string}`) {
  return Hex.toString(value, { size: 32 }).replace(/\0+$/g, '').trim();
}
