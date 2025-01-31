import { isObject } from '~/utils/isObject';

const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

export const isFragment = (element: React.ReactElement): boolean => {
  const type = element.type;
  if (isObject(type)) {
    return false;
  }

  return (type as unknown as symbol) === REACT_FRAGMENT_TYPE;
};
