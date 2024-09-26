import type { IRichTooltipContentOwnProps } from '../RichTooltipContent';
import type { IRichTooltipThemeFactory } from './RichTooltip.css';
import type { IRichTooltipFactory } from './RichTooltip.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PopoverBase } from '../PopoverBase';
import { RichTooltipContent } from '../RichTooltipContent';
import { richTooltipTheme } from './RichTooltip.css';

const COMPONENT_NAME = 'RichTooltip';

export const RichTooltip = componentFactory<IRichTooltipFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      slotProps,
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
      theme: richTooltipTheme,
      variant,
    });

    return (
      <PopoverBase
        // FIXME: find a way to make a composant without theme
        {...getStyles('root')}
        contentRenderer={({ forwardedProps, close, renderCursor }) => (
          <RichTooltipContent
            ref={forwardedRef}
            renderCursor={renderCursor}
            onClose={close}
            {...(forwardedProps as IRichTooltipContentOwnProps)}
            {...slotProps?.richTooltipContent}
          >
            {children}
          </RichTooltipContent>
        )}
        slotProps={slotProps}
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
        withScrim={persistent}
        lockScroll={persistent}
        closeEvents={{
          clickOutside: !persistent,
          focusOut: !persistent,
          escapeKey: false,
        }}
        {...other}
      >
        {(renderProps) => (
          <span {...renderProps.getProps()} ref={renderProps.setRef}>
            {/* {isFunction(children) ? children(renderProps) : children} */}
            XX
          </span>
        )}
      </PopoverBase>
    );
  },
);

RichTooltip.theme = richTooltipTheme;
RichTooltip.displayName = `@sixui/${COMPONENT_NAME}`;
