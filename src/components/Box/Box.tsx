import { forwardRef } from 'react';

import type { IBoxModifiers, IBoxProps } from './Box.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';

const getModifiers = (modifiers: IBoxModifiers): Record<string, string> =>
  Object.entries(modifiers).reduce((acc, [key, value]) => {
    if (
      value === undefined ||
      value === '' ||
      value === false ||
      value === null
    ) {
      return acc;
    }

    return {
      ...acc,
      [`data-${key}`]: String(value),
    };
  }, {});

export const Box = createPolymorphicComponent<'div', IBoxProps>(
  forwardRef<HTMLDivElement, IBoxProps>(function Box(props, forwardedRef) {
    const {
      as: Component = 'div',
      renderRoot,
      modifiers,
      ...other
    } = props as IWithAsProp<IBoxProps>;

    const childrenProps = {
      ...other,
      ...(modifiers ? getModifiers(modifiers) : {}),
      ref: forwardedRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
