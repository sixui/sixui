import { forwardRef } from 'react';
import { useFocusRing, useHover } from 'react-aria';

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
      interactions,
      modifiers,
      ...other
    } = props as IWithAsProp<IBoxProps>;

    const { hoverProps, isHovered } = useHover({
      ...(typeof interactions?.hover !== 'boolean' && interactions?.hover),
      isDisabled: !interactions?.hover,
    });
    const { focusProps, isFocusVisible } = useFocusRing({
      ...(typeof interactions?.focusVisible !== 'boolean' &&
        interactions?.focusVisible),
    });

    const childrenProps = {
      ...other,
      ...hoverProps,
      ...(interactions?.focusVisible ? focusProps : undefined),
      ...getModifiers({
        ...modifiers,
        hovered: isHovered,
        focusVisible: isFocusVisible,
      }),
      ref: forwardedRef,
    };

    return renderRoot ? (
      renderRoot(childrenProps)
    ) : (
      <Component {...childrenProps} />
    );
  }),
);
