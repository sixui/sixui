import { forwardRef } from 'react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { DeterminateCircularProgressIndicator } from '../DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';

export const CircularProgressIndicator = createPolymorphicComponent<
  'div',
  ICircularProgressIndicatorProps
>(
  forwardRef<HTMLDivElement, ICircularProgressIndicatorProps>(
    function CircularProgressIndicator(props, forwardedRef) {
      const { value } = props;

      return value === undefined ? (
        <IndeterminateCircularProgressIndicator {...props} ref={forwardedRef} />
      ) : (
        <DeterminateCircularProgressIndicator
          {...props}
          ref={forwardedRef}
          value={value}
        />
      );
    },
  ),
);
