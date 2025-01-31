export const getDisplayName = (
  element: React.ReactElement,
): string | undefined => {
  const type = element.type;
  const component = type as React.JSXElementConstructor<unknown> & {
    readonly displayName: string | undefined;
  };

  return component.displayName;
};
