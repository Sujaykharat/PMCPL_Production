export type ClassValue = string | null | undefined | false;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

