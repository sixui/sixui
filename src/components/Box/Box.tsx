import { useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';
import cx from 'clsx';

import type { IBoxProps } from './Box.types';
import { getDataAttributes } from '~/utils/getDataAttributes';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/utils/component/createPolymorphicComponent';
import { boxSprinkles } from './Box.css';

export const Box = createPolymorphicComponent<'div', IBoxProps>(
  forwardRef<HTMLDivElement, IBoxProps>(function Box(props, forwardedRef) {
    const {
      as: Component = 'div',
      className,
      style,
      renderRoot,
      interactions,
      modifiers,
      ...otherWithSprinkles
    } = props as IWithAsProp<IBoxProps>;
    const sprinkles = boxSprinkles(otherWithSprinkles);

    const handleRef = useMergeRefs([forwardedRef, interactions?.targetRef]);
    const childrenProps = {
      ...sprinkles.otherProps,
      ...interactions?.targetProps,
      ...getDataAttributes({
        ...(interactions?.combinedStatus
          ? { [interactions.combinedStatus]: true }
          : undefined),
        ...modifiers,
      }),
      className: cx(className, sprinkles.className),
      style: {
        ...style,
        ...sprinkles.style,
      },
      ref: handleRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
