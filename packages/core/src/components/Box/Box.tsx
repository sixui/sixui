import { forwardRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import cx from 'clsx';

import type { IWithAsProp } from '~/utils/component/createPolymorphicComponent';
import type { IBoxProps } from './Box.types';
import { themeTokens } from '~/components/Theme';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { getDataAttributes } from '~/utils/getDataAttributes';
import { mergeProps } from '~/utils/mergeProps';
import { boxSprinkles, styles } from './Box.css';

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
      hiddenFrom,
      visibleFrom,
      ...otherWithSprinkles
    } = props as IWithAsProp<IBoxProps>;

    const sprinkles = boxSprinkles(otherWithSprinkles);
    const other = sprinkles.otherProps;

    const childrenProps = {
      ...mergeProps(other, {
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
          // When using a different element than a button, we want to allow the
          // Enter or Space key to trigger the click event for accessibility
          // purpose.
          if (
            (event.target as HTMLElement).tagName !== 'BUTTON' &&
            typeof other.role === 'string' &&
            ['button', 'combobox', 'listbox'].includes(other.role) &&
            (event.key === 'Enter' || event.key === ' ')
          ) {
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.click();
          }
        },
      }),
      ...getDataAttributes({
        scale,
        ...interactions,
        ...modifiers,
      }),
      className: cx(styles.root, className, sprinkles.className, {
        [`sixui-hidden-from-${String(hiddenFrom)}`]: hiddenFrom,
        [`sixui-visible-from-${String(visibleFrom)}`]: visibleFrom,
      }),
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
