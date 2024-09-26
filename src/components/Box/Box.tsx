import { forwardRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import cx from 'clsx';

import type { IWithAsProp } from '~/utils/component/createPolymorphicComponent';
import type { IBoxProps } from './Box.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { getDataAttributes } from '~/utils/getDataAttributes';
import { themeTokens } from '../ThemeProvider';
import { boxRootClassName, boxSprinkles } from './Box.css';

export const Box = createPolymorphicComponent<'div', IBoxProps>(
  forwardRef<HTMLDivElement, IBoxProps>(function Box(props, forwardedRef) {
    const {
      as: Component = 'div',
      className,
      style,
      renderRoot,
      interactions,
      modifiers,
      scale,
      density,
      ...otherWithSprinkles
    } = props as IWithAsProp<IBoxProps>;

    const sprinkles = boxSprinkles(otherWithSprinkles);
    const other = sprinkles.otherProps;

    const childrenProps = {
      ...other,
      ...getDataAttributes({
        scale,
        ...interactions,
        ...modifiers,
      }),
      className: cx(boxRootClassName, className, sprinkles.className),
      style: {
        ...style,
        ...sprinkles.style,
        ...assignInlineVars({
          [themeTokens.density.scale]: density ? String(density) : undefined,
        }),
      },
      ref: forwardedRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
