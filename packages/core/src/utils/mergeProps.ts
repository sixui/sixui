import cx from 'clsx';
import { UnionToIntersection } from 'type-fest';

import type { IAny } from '~/utils/types';
import { chain } from './chain';
import { mergeRefs } from './mergeRefs';

// Inspired from: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts

type IProps = Record<string, IAny>;
type IPropsArg = IProps | null | undefined;

// Taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type ITupleTypes<T> =
  { [P in keyof T]: T[P] } extends Record<number, infer V>
    ? INullToObject<V>
    : never;
type INullToObject<T> = T extends null | undefined ? object : T;

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, styles are combined and refs are merged. For all
 * other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export const mergeProps = <TPropsList extends Array<IPropsArg>>(
  ...args: TPropsList
): UnionToIntersection<ITupleTypes<TPropsList>> => {
  // Start with a base clone of the first argument. This is a lot faster than
  // starting with an empty object and adding properties as we go.
  const result: IProps = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];

      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        // This is a lot faster than a regex.
        key.startsWith('on') &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        // Chain events.
        result[key] = chain(a, b);
      } else if (
        key === 'className' &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        // Merge classnames, sometimes classNames are empty string which eval to
        // false, so we just need to do a type check.
        result[key] = cx(a, b);
      } else if (
        key === 'style' &&
        typeof a === 'object' &&
        typeof b === 'object'
      ) {
        // Merge styles.
        result.style = { ...a, ...b };
      } else if (key === 'ref' && a && b) {
        // Merge refs.
        result.ref = mergeRefs(
          a as React.Ref<unknown>,
          b as React.Ref<unknown>,
        );
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result as UnionToIntersection<ITupleTypes<TPropsList>>;
};
