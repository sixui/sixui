import { forwardRef } from 'react';

import type { IAny, IOmit } from '@/helpers/types';
import { Field } from '@/components/atoms/Field';
import { SelectBase, type ISelectBaseProps } from './SelectBase';

export type ISelectProps<TItem> = IOmit<ISelectBaseProps<TItem>, 'children'>;

type ISelect = <TItem extends IAny>(
  props: ISelectProps<TItem> & {
    ref?: React.ForwardedRef<HTMLButtonElement>;
  },
) => React.ReactNode;

export const Select: ISelect = forwardRef(function Select(
  props,
  forwardedRef?: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <SelectBase<(typeof props.items)[number]> {...props} ref={forwardedRef}>
      {(renderProps) => (
        <Field as='button' {...renderProps.props}>
          {/* {renderOption()} */}
          VALUE
        </Field>
      )}
    </SelectBase>
  );
});
