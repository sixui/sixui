export const getUid = (prefix?: string): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2);
  const uid = `${prefix ? `${prefix}-` : ''}${randomPart}${timestamp}`;

  return uid;
};
