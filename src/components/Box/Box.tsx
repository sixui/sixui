import { forwardRef } from 'react';
import cx from 'clsx';

import type { IBoxProps } from './Box.types';
import { getDataAttributes } from '~/utils/getDataAttributes';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/utils/component/createPolymorphicComponent';
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
      size,
      ...otherWithSprinkles
    } = props as IWithAsProp<IBoxProps>;

    const sprinkles = boxSprinkles(otherWithSprinkles);
    const other = sprinkles.otherProps;

    const childrenProps = {
      ...other,
      ...getDataAttributes({
        size,
        ...interactions,
        ...modifiers,
      }),
      className: cx(boxRootClassName, className, sprinkles.className),
      style: {
        ...style,
        ...sprinkles.style,
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
