import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '@/helpers/types';
import type { IVisualState } from '@/hooks/useVisualState';
import { Field } from '@/components/atoms/Field';
import { SelectBase, type ISelectBaseProps } from './SelectBase';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';

export type IFruitSelectOption = {
  name: string;
  icon?: IconDefinition;
  value?: string;
};

export type IFruitSelectProps = IOmit<
  ISelectBaseProps<IFruitSelectOption>,
  'children'
> & {
  visualState?: IVisualState;
};

type IFruitSelect = (
  props: IFruitSelectProps & {
    ref?: React.ForwardedRef<HTMLElement>;
  },
) => React.ReactNode;

export const FruitSelect: IFruitSelect = forwardRef(function Select(
  props,
  forwardedRef?: React.ForwardedRef<HTMLElement>,
) {
  const { activeItem, visualState, menuProps } = props;

  return (
    <SelectBase<IFruitSelectOption> {...props} ref={forwardedRef}>
      {(renderProps) => (
        <Field
          as='button'
          label='Fruit'
          variant='outlined'
          ref={renderProps.ref}
          leadingIcon={
            activeItem?.icon ? (
              <FontAwesomeIcon icon={activeItem.icon} />
            ) : undefined
          }
          end={renderProps.isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
          visualState={
            renderProps.isOpen ? { ...visualState, focused: true } : visualState
          }
          {...renderProps.props}
        >
          {activeItem?.name}
        </Field>
      )}
    </SelectBase>
  );
});
