export type IAreaRect = [number, number, number, number];

export const getValidRectFromArea = (area: string): IAreaRect | undefined => {
  const isValidArea = /^\d+(\s*,\s*\d+){3}$/.test(area);
  if (!isValidArea) {
    return undefined;
  }

  const rect = area.split(/\s*,\s*/).map((s) => parseInt(s, 10)) as IAreaRect;

  return rect;
};
