export const getComponentDisplayName = (
  element: React.ReactElement<unknown>,
): string | undefined => {
  const node = element as React.ReactElement<React.ComponentType<unknown>>;
  const type = (node as unknown as React.ReactElement<React.FunctionComponent>)
    .type;
  const displayName =
    typeof type === 'function'
      ? (type as React.FunctionComponent).displayName ??
        (type as React.FunctionComponent).name ??
        undefined
      : type;

  return displayName;
};
