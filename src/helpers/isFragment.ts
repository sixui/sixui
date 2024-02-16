import type { IAny } from './types';

const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

export const isFragment = (object: IAny): boolean => {
  if (typeof object === 'object' && object !== null) {
    const component = object as {
      readonly $$typeof: unique symbol;
      readonly type: unique symbol;
    };
    const $$typeof = component.$$typeof;

    if ($$typeof === REACT_ELEMENT_TYPE) {
      const type = component.type;

      if (type === REACT_FRAGMENT_TYPE) {
        return true;
      }
    }
  }

  return false;
};
