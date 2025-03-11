import type { ISnackbarContentThemeFactory } from './SnackbarContent.css';
import type { ISnackbarContentFactory } from './SnackbarContent.types';
import { iconXMark } from '~/assets/icons';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { PaperBase } from '~/components/PaperBase';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SnackbarContent.constants';
import { snackbarContentTheme } from './SnackbarContent.css';

/**
 * @see https://m3.material.io/components/snackbar/overview
 */
export const SnackbarContent = componentFactory<ISnackbarContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      actionLabel,
      onActionClick,
      onClose,
      showCloseButton,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISnackbarContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: snackbarContentTheme,
      modifiers: {
        'with-trailing-action': !!actionLabel,
        'with-trailing-icon': !!showCloseButton,
      },
    });

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('supportingText')}>{children}</div>

        {(actionLabel ?? showCloseButton) && (
          <div {...getStyles('actions')}>
            {actionLabel && (
              <Button variant="snackbar" onClick={onActionClick}>
                {actionLabel}
              </Button>
            )}

            {showCloseButton && (
              <IconButton
                variant="snackbar"
                icon={<SvgIcon icon={iconXMark} />}
                onClick={onClose}
                aria-label="close"
              />
            )}
          </div>
        )}
      </PaperBase>
    );
  },
);

SnackbarContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
SnackbarContent.theme = snackbarContentTheme;
