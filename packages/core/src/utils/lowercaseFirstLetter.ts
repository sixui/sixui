export const lowercaseFirstLetter = (value: string): string => {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
};
