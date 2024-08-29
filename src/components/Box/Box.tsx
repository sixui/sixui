import { useMergeRefs } from '@floating-ui/react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import type { IBoxProps } from './Box.types';
import { getDataAttributes } from '~/utils/getDataAttributes';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/utils/createPolymorphicComponent';

export const Box = createPolymorphicComponent<'div', IBoxProps>(
  forwardRef<HTMLDivElement, IBoxProps>(function Box(props, forwardedRef) {
    const {
      as: Component = 'div',
      className,
      renderRoot,
      interactions,
      modifiers,
      ...other
    } = props as IWithAsProp<IBoxProps>;

    const handleRef = useMergeRefs([forwardedRef, interactions?.targetRef]);
    const childrenProps = {
      ...other,
      ...interactions?.targetProps,
      ...getDataAttributes({
        ...(interactions?.combinedStatus
          ? { [interactions.combinedStatus]: true }
          : undefined),
        ...modifiers,
      }),
      className: clsx(className),
      ref: handleRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
