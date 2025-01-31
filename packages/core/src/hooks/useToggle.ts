import { useReducer } from 'react';

import type { IAny } from '~/utils/types';

export type IUseToggleResult<T = boolean> = readonly [
  T,
  (value?: React.SetStateAction<T>) => void,
];

export const useToggle = <T = boolean>(
  options: ReadonlyArray<T> = [false, true] as IAny,
): IUseToggleResult<T> => {
  const [[option], toggle] = useReducer(
    (state: Array<T>, action: React.SetStateAction<T>) => {
      const value = action instanceof Function ? action(state[0]!) : action;
      const index = Math.abs(state.indexOf(value));

      return state.slice(index).concat(state.slice(0, index));
    },
    options as Array<T>,
  );

  return [
    option!,
    toggle as (value?: React.SetStateAction<T>) => void,
  ] as const;
};
