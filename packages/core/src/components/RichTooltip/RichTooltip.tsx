import type { IRichTooltipThemeFactory } from './RichTooltip.css';
import type { IRichTooltipFactory } from './RichTooltip.types';
import type { IRichTooltipContentOwnProps } from './RichTooltipContent';
import { PopoverBase } from '~/components/PopoverBase';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '../ThemeProvider';
import { COMPONENT_NAME } from './RichTooltip.constants';
import { RichTooltipContent } from './RichTooltipContent';
import { richTooltipTheme } from './RichTooltip.css';

export const RichTooltip = componentFactory<IRichTooltipFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      richTooltipContentProps,
      placement = { side: 'bottom', alignment: 'end' },
      persistent,
      ...other
    } = props;

    const { getStyles } = useComponentTheme<IRichTooltipThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: richTooltipTheme,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ forwardedProps, close, renderCursor }) => (
          <RichTooltipContent
            renderCursor={renderCursor}
            {...mergeProps(
              {
                onClose: close,
                ref: forwardedRef,
              },
              forwardedProps as IRichTooltipContentOwnProps,
              richTooltipContentProps,
            )}
          >
            {children}
          </RichTooltipContent>
        )}
        role="tooltip"
        cursor="dot"
        forwardProps
        placement={placement}
        openEvents={{
          click: !!persistent,
          hover: !persistent,
          focus: !persistent,
        }}
        positioned
        trapFocus={persistent}
        scrim={persistent}
        closeEvents={{
          clickOutside: !persistent,
          focusOut: !persistent,
          escapeKey: false,
        }}
        {...other}
      >
        {(renderProps) => (
          <span
            {...getStyles('wrapper')}
            {...renderProps.getProps()}
            ref={renderProps.setRef}
          >
            {isFunction(children) ? children(renderProps) : children}
          </span>
        )}
      </PopoverBase>
    );
  },
);

RichTooltip.theme = richTooltipTheme;
RichTooltip.displayName = `@sixui/${COMPONENT_NAME}`;
