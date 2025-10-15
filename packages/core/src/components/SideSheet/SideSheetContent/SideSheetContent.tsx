import type { ISideSheetContentThemeFactory } from './SideSheetContent.css';
import type { ISideSheetContentFactory } from './SideSheetContent.types';
import { iconXMark } from '~/assets/icons';
import { IconButton } from '~/components/IconButton';
import { Paper } from '~/components/Paper';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './SideSheetContent.constants';
import {
  sideSheetContentTheme,
  sideSheetContentThemeVariants,
} from './SideSheetContent.css';

export const SideSheetContent = componentFactory<ISideSheetContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'standard',
      onClose,
      children,
      headline,
      leadingActions,
      trailingActions,
      showCloseButton,
      closeIcon = <SvgIcon icon={iconXMark} />,
      header,
      footer,
      bottomActions,
      side = 'left',
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISideSheetContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetContentTheme,
      themeVariants: sideSheetContentThemeVariants,
    });

    const hasHeadline =
      !!headline || !!leadingActions || !!trailingActions || showCloseButton;
    const hasHeader = !!header || hasHeadline;
    const hasFooter = footer ?? bottomActions;

    return (
      <Paper
        {...getStyles('root', {
          modifiers: {
            side,
            'with-divider': divider,
            'with-leading-actions': !!leadingActions,
            'with-header': hasHeadline && !hasHeader,
            'with-footer': !!footer,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('inner')}>
          {hasHeader && (
            <div {...getStyles('headerContainer')}>
              {(leadingActions ||
                headline ||
                trailingActions ||
                showCloseButton) && (
                <div {...getStyles('header')}>
                  {leadingActions && (
                    <div {...getStyles('actions')}>{leadingActions}</div>
                  )}
                  {headline && <div {...getStyles('headline')}>{headline}</div>}
                  {(trailingActions || showCloseButton) && (
                    <div {...getStyles('actions')}>
                      {trailingActions}
                      {showCloseButton && (
                        <IconButton icon={closeIcon} onClick={onClose} />
                      )}
                    </div>
                  )}
                </div>
              )}

              {header}
            </div>
          )}

          {children && (
            <div {...getStyles('content')}>
              {isFunction(children)
                ? children({ close: () => onClose?.() })
                : children}
            </div>
          )}

          {hasFooter && (
            <div {...getStyles('footerContainer')}>
              <div {...getStyles('footer')}>
                {bottomActions && (
                  <div {...getStyles('actions')}>
                    {isFunction(bottomActions)
                      ? bottomActions({ close: () => onClose?.() })
                      : bottomActions}
                  </div>
                )}
              </div>

              {footer}
            </div>
          )}
        </div>
      </Paper>
    );
  },
);

SideSheetContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
SideSheetContent.theme = sideSheetContentTheme;
