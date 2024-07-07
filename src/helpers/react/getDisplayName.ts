import { isFunction, isObject } from 'lodash';

export const getDisplayName = (
  element: React.ReactElement,
): string | undefined => {
  const type = element.type;
  if (!isObject(type) && isFunction(type)) {
    return undefined;
  }

  const component = type as React.JSXElementConstructor<unknown> & {
    readonly displayName: string | undefined;
  };

  return component.displayName;
};
