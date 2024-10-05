import type { IPlainTooltipContentOwnProps } from '../PlainTooltipContent';
import type { IPlainTooltipThemeFactory } from './PlainTooltip.css';
import type { IPlainTooltipFactory } from './PlainTooltip.types';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PlainTooltipContent } from '../PlainTooltipContent';
import { PopoverBase } from '../PopoverBase';
import { plainTooltipTheme } from './PlainTooltip.css';

const COMPONENT_NAME = 'PlainTooltip';

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
      theme: plainTooltipTheme,
      variant,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ forwardedProps, renderCursor }) => (
          <PlainTooltipContent
            renderCursor={renderCursor}
            {...mergeProps(
              { ref: forwardedRef },
              forwardedProps as IPlainTooltipContentOwnProps,
              plainTooltipContentProps,
            )}
          >
            {children}
          </PlainTooltipContent>
        )}
        role="tooltip"
        cursor="arrow"
        forwardProps
        openEvents={{ hover: true, focus: true }}
        positioned
        {...other}
      >
        {(renderProps) => (
          <span {...renderProps.getProps()} ref={renderProps.setRef}>
            {isFunction(children) ? children(renderProps) : children}
          </span>
        )}
      </PopoverBase>
    );
  },
);

PlainTooltip.theme = plainTooltipTheme;
PlainTooltip.displayName = `@sixui/${COMPONENT_NAME}`;
