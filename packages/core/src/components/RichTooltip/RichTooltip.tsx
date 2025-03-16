import type { IRichTooltipThemeFactory } from './RichTooltip.css';
import type { IRichTooltipFactory } from './RichTooltip.types';
import type { IRichTooltipContentOwnProps } from './RichTooltipContent';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './RichTooltip.constants';
import { RichTooltipContent } from './RichTooltipContent';
import { richTooltipTheme } from './RichTooltip.css';

/**
 * @see https://m3.material.io/components/tooltips/overview
 */
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
        contentRenderer={({ foreignProps, close, renderCursor }) => (
          <RichTooltipContent
            renderCursor={renderCursor}
            {...mergeProps(
              {
                onClose: close,
                ref: forwardedRef,
              },
              foreignProps as IRichTooltipContentOwnProps,
              richTooltipContentProps,
            )}
          >
            {children}
          </RichTooltipContent>
        )}
        role="tooltip"
        cursor="dot"
        forwardForeignProps
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
            {children}
          </span>
        )}
      </PopoverBase>
    );
  },
);

RichTooltip.displayName = `@sixui/core/${COMPONENT_NAME}`;
RichTooltip.theme = richTooltipTheme;
