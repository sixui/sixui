import type { IPlainTooltipContentThemeFactory } from './PlainTooltipContent.css';
import type { IPlainTooltipContentFactory } from './PlainTooltipContent.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './PlainTooltipContent.constants';
import { plainTooltipContentTheme } from './PlainTooltipContent.css';

export const PlainTooltipContent =
  componentFactory<IPlainTooltipContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      supportingText,
      renderCursor,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IPlainTooltipContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: plainTooltipContentTheme,
    });

    return (
      <Paper
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      >
        {renderCursor?.(getStyles('cursor'))}
        <div {...getStyles('supportingText')}>{supportingText}</div>
      </Paper>
    );
  });

PlainTooltipContent.theme = plainTooltipContentTheme;
PlainTooltipContent.displayName = `@sixui/${COMPONENT_NAME}`;
