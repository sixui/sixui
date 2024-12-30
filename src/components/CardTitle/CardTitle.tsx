import type { ICardTitleThemeFactory } from './CardTitle.css';
import type { ICardTitleFactory } from './CardTitle.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { cardTitleTheme } from './CardTitle.css';

const COMPONENT_NAME = 'CardTitle';

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

        {supportingText ? (
          <div {...getStyles('supportingText')}>{supportingText}</div>
        ) : null}
      </Box>
    );
  },
);

CardTitle.theme = cardTitleTheme;
CardTitle.displayName = `@sixui/${COMPONENT_NAME}`;
