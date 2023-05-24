export function bindObject<T extends Record<string, unknown>>(object: T): T {
  for (const [key, value] of Object.entries(object) as [keyof T, T[keyof T]][]) {
    if (typeof value === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      object[key] = value.bind(object);
    }
  }

  return object;
}
