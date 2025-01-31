import type { ICardTitleThemeFactory } from './CardTitle.css';
import type { ICardTitleFactory } from './CardTitle.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CardTitle.constants';
import { cardTitleTheme } from './CardTitle.css';

export const CardTitle = componentFactory<ICardTitleFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      headline,
      subhead,
      supportingText,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICardTitleThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: cardTitleTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('header')}>
          {headline && <div {...getStyles('headline')}>{headline}</div>}
          {subhead && <div {...getStyles('subhead')}>{subhead}</div>}
        </div>

        {supportingText && (
          <div {...getStyles('supportingText')}>{supportingText}</div>
        )}
      </Box>
    );
  },
);

CardTitle.theme = cardTitleTheme;
CardTitle.displayName = `@sixui/${COMPONENT_NAME}`;
