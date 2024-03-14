export const getDisplayName = (
  element: React.ReactElement,
): string | undefined => {
  const node = element as React.ReactElement<React.ComponentType>;
  const type = (node as React.ReactElement<React.FunctionComponent>).type;
  const displayName =
    typeof type === 'function'
      ? (type as React.FunctionComponent).displayName ??
        (type as React.FunctionComponent).name ??
        undefined
      : type;

  return displayName;
};
