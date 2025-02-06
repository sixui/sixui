import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { useOverlayContext } from '~/components/Overlays/Overlay.context';
import { useOverlaysStateContext } from '~/components/Overlays/OverlaysState.context';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './Dialog.constants';
import { DialogContent, IDialogContentOwnProps } from './DialogContent';
import { dialogTheme } from './Dialog.css';

export const Dialog = polymorphicComponentFactory<IDialogFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      scrim: scrimProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDialogThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dialogTheme,
    });

    const overlaysStateContext = useOverlaysStateContext();
    const overlayContext = useOverlayContext();
    const overlayInstancePosition = overlayContext?.instanceId
      ? overlaysStateContext.getInstancePosition(overlayContext.instanceId)
      : undefined;

    const scrim = scrimProp ?? other.modal;

    return (
      <PopoverBase
        {...getStyles('root', {
          style: assignInlineVars({
            [dialogTheme.tokens.overlayIndex]: overlayInstancePosition
              ? String(overlayInstancePosition.index)
              : '0',
          }),
        })}
        contentRenderer={({ close, forwardedProps }) => (
          <DialogContent
            ref={forwardedRef}
            {...mergeProps(
              { onClose: close },
              forwardedProps as IDialogContentOwnProps,
            )}
          >
            {children}
          </DialogContent>
        )}
        closeEvents={{ focusOut: false }}
        middlewares={false}
        forwardProps
        scrim={scrim}
        {...other}
      />
    );
  },
);
