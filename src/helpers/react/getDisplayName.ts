import { isObject } from '../isObject';

export const getDisplayName = (
  element: React.ReactElement,
): string | undefined => {
  const type = element.type;
  if (!isObject(type) && typeof type !== 'function') {
    return undefined;
  }

  const component = type as React.JSXElementConstructor<unknown> & {
    readonly displayName: string | undefined;
  };

  return component.displayName;
};
