const UNITS = ['B', 'kB', 'MB', 'GB', 'TB'];

// https://stackoverflow.com/a/20732091/7628220
export const getFormattedFileSize = (size: number): string => {
  const unitIndex = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const formattedSize = (size / Math.pow(1024, unitIndex)).toFixed(2);
  const formattedSizeWithUnit = `${formattedSize} ${UNITS[unitIndex]}`;

  return formattedSizeWithUnit;
};
