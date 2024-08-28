import { forwardRef } from 'react';

import type { IBoxModifiers, IBoxProps } from './Box.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useMergeRefs } from '@floating-ui/react';

const getTransformedModifiers = (
  modifiers: IBoxModifiers,
): Record<string, string> =>
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
      interactions,
      modifiers,
      ...other
    } = props as IWithAsProp<IBoxProps>;

    const handleRef = useMergeRefs([forwardedRef, interactions?.targetRef]);
    const childrenProps = {
      ...other,
      ...interactions?.targetProps,
      ...getTransformedModifiers({
        ...(interactions?.combinedStatus
          ? { [interactions.combinedStatus]: true }
          : undefined),
        ...modifiers,
      }),
      ref: handleRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
