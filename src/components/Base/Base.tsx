import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IBaseProps } from './Base.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';

export const Base = createPolymorphicComponent<'div', IBaseProps>(
  forwardRef<HTMLDivElement, IBaseProps>(function Base(props, forwardedRef) {
    const { component, renderRoot, sx, ...other } =
      props as IWithAsProp<IBaseProps>;
    const Element = component ?? 'div';
    const childrenProps = {
      ...other,
      ref: forwardedRef,
      ...(typeof Element === 'string' && !renderRoot
        ? stylex.props(sx)
        : { sx }),
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Element {...childrenProps} />
    );
  }),
);
