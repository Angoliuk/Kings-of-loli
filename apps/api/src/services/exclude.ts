export const exclude = <T, Key extends keyof T>(model: T, keys: Key[]): Omit<T, Key> => {
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete model[key];
  }
  return model;
};
