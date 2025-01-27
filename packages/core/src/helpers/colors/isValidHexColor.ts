const hexRegex = /^#[A-Fa-f0-9]{6}$/;

export const isValidHexColor = (color: string): boolean => hexRegex.test(color);
