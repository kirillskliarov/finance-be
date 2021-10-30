export function parseBoolean(value: string): boolean {
  return String(value).toLowerCase() === String(true);
}
