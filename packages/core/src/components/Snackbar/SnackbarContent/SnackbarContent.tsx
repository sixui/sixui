import type { ISnackbarContentThemeFactory } from './SnackbarContent.css';
import type { ISnackbarContentFactory } from './SnackbarContent.types';
import { iconXMark } from '~/assets/icons';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { PaperBase } from '~/components/PaperBase';
import { SvgIcon } from '~/components/SvgIcon';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './SnackbarContent.constants';
import { snackbarContentTheme } from './SnackbarContent.css';

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
      <PaperBase
        {...getStyles('root')}
        as={Flex}
        direction="row"
        gap="$3"
        ref={forwardedRef}
        wrap
        {...other}
      >
        <div {...getStyles('supportingText')}>{children}</div>

        {(actionLabel ?? showCloseButton) && (
          <Flex {...getStyles('actions')} direction="row" gap="$2">
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
          </Flex>
        )}
      </PaperBase>
    );
  },
);

SnackbarContent.theme = snackbarContentTheme;
SnackbarContent.displayName = `@sixui/${COMPONENT_NAME}`;
