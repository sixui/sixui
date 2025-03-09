import type { ICardActionsThemeFactory } from './CardActions.css';
import type { ICardActionsFactory } from './CardActions.types';
import { Flex } from '~/components/Flex';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CardActions.constants';
import { cardActionsTheme } from './CardActions.css';

/**
 * @see https://m3.material.io/components/cards/overview
 */
export const CardActions = componentFactory<ICardActionsFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICardActionsThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: cardActionsTheme,
    });

    return (
      <Flex ref={forwardedRef} {...getStyles('root')} {...other}>
        {children}
      </Flex>
    );
  },
);

CardActions.theme = cardActionsTheme;
CardActions.displayName = `@sixui/core/${COMPONENT_NAME}`;
