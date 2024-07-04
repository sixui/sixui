import { isFunction } from 'lodash';

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/setRef.ts

/**
 * passes `value` to `ref`
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous `ref` if it changes. See
 * https://github.com/mui/material-ui/issues/13539
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 *
 * @param ref - A ref callback or ref object. If anything falsy, this is a
 * no-op.
 */
export const setRef = <T>(
  ref:
    | React.MutableRefObject<T | null>
    | React.RefCallback<T>
    | null
    | undefined,
  value: T | null,
): void => {
  if (isFunction(ref)) {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};
