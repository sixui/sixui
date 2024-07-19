export const getForegroundLuminance = (backgroundLuminance: number): number => {
  return backgroundLuminance >= 60 ? 0 : 100;
};
