import type { IPlainTooltipThemeFactory } from './PlainTooltip.css';
import type { IPlainTooltipFactory } from './PlainTooltip.types';
import type { IPlainTooltipContentOwnProps } from './PlainTooltipContent';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './PlainTooltip.constants';
import { PlainTooltipContent } from './PlainTooltipContent';
import { plainTooltipTheme } from './PlainTooltip.css';

/**
 * @see https://m3.material.io/components/tooltips/overview
 */
export const PlainTooltip = componentFactory<IPlainTooltipFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      plainTooltipContentProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IPlainTooltipThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: plainTooltipTheme,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ foreignProps, renderCursor }) => (
          <PlainTooltipContent
            renderCursor={renderCursor}
            {...mergeProps(
              { ref: forwardedRef },
              foreignProps as IPlainTooltipContentOwnProps,
              plainTooltipContentProps,
            )}
          >
            {children}
          </PlainTooltipContent>
        )}
        role="tooltip"
        cursor="arrow"
        forwardForeignProps
        openEvents={{ hover: true, focus: true }}
        positioned
        {...other}
      >
        {(renderProps) => (
          <span {...renderProps.getProps()} ref={renderProps.setRef}>
            {children}
          </span>
        )}
      </PopoverBase>
    );
  },
);

PlainTooltip.displayName = `@sixui/core/${COMPONENT_NAME}`;
PlainTooltip.theme = plainTooltipTheme;
