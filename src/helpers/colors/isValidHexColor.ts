const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;

export const isValidHexColor = (color: string): boolean => hexRegex.test(color);
