import type { IDropZoneThemeFactory } from './DropZone.css';
import type { IDropZoneFactory } from './DropZone.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { COMPONENT_NAME } from './DropZone.constants';
import { IDropZoneProps } from './DropZone.types';
import { dropZoneTheme } from './DropZone.css';

export const DropZone = componentFactory<IDropZoneFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      actionIcon,
      actionLabel,
      children,
      disabled,
      dropping,
      onClick,
      supportingText,
      trailingSupportingText,
      hasError,
      errorText,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } =
      extractBoxProps<IDropZoneProps>(other);

    const interactive = !disabled && !!onClick;

    const { getStyles } = useComponentTheme<IDropZoneThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dropZoneTheme,
      modifiers: {
        disabled,
        dropping,
        interactive,
        'with-error': hasError,
      },
    });

    const hasAction = !!actionIcon || !!actionLabel;
    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;
    const hasFooter = supportingOrErrorText || !!trailingSupportingText;

    return (
      <Box {...getStyles('root')} ref={rootRef} {...forwardedProps}>
        <ButtonBase
          {...getStyles('button')}
          ref={forwardedRef}
          nonInteractive={!interactive}
          variant="text"
          disabled={disabled}
          onClick={onClick}
          {...boxProps}
        >
          {label && <div {...getStyles(['text', 'label'])}>{label}</div>}
          {hasAction && (
            <div {...getStyles('action')}>
              {actionIcon && (
                <div {...getStyles('actionIcon')}>{actionIcon}</div>
              )}
              {actionLabel && (
                <div {...getStyles(['text', 'actionLabel'])}>{actionLabel}</div>
              )}
            </div>
          )}
          {typeof children === 'function'
            ? children({ dropping, hasError })
            : children}
        </ButtonBase>

        {hasFooter && (
          <div {...getStyles('supportingTextContainer')}>
            {supportingOrErrorText && (
              <div {...getStyles('supportingText')}>
                {supportingOrErrorText}
              </div>
            )}
            {trailingSupportingText && (
              <div {...getStyles('trailingSupportingText')}>
                {trailingSupportingText}
              </div>
            )}
          </div>
        )}
      </Box>
    );
  },
);

DropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
DropZone.theme = dropZoneTheme;
