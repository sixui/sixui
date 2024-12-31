import type { ICardActionsThemeFactory } from './CardActions.css';
import type { ICardActionsFactory } from './CardActions.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { cardActionsTheme } from './CardActions.css';

const COMPONENT_NAME = 'CardActions';

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
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

CardActions.theme = cardActionsTheme;
CardActions.displayName = `@sixui/${COMPONENT_NAME}`;
