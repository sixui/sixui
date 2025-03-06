// https://stackoverflow.com/a/20732091/7628220
export const getFormattedFileSize = (
  size: number,
  units = ['B', 'kB', 'MB', 'GB', 'TB'],
): string => {
  const unitIndex = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const formattedSize = (size / Math.pow(1024, unitIndex)).toFixed(2);
  const formattedSizeWithUnit = `${formattedSize} ${units[unitIndex]}`;

  return formattedSizeWithUnit;
};
