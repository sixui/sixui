// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const managerEntries = (entry = []) => {
  return [...entry, require.resolve('./manager')];
};
