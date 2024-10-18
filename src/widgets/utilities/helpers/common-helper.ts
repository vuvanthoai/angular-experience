const replacer = <T extends object>(key: string, value: T) => {
  if (value === null || !value) {
    return undefined;
  }
  return value;
};

export const removeNullOrUndefinedProperties = <T>(
  object: NonNullable<T>
): NonNullable<T> => {
  return JSON.parse(JSON.stringify(object, replacer));
};
