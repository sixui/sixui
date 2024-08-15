import { forwardRef } from 'react';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { useStyles } from '~/hooks/useStyles';
import { isFunction } from '~/helpers/isFunction';
import { iconXMark } from '~/assets/icons';
import { PaperBase } from '../PaperBase';
import { sideSheetContentStyles } from './SideSheetContent.styles';
import { sideSheetContentTheme } from './SideSheetContent.stylex';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { sideSheetVariantContentStyles } from './variants';

export const SideSheetContent = forwardRef<
  HTMLDivElement,
  ISideSheetContentProps
>(function SideSheetContent(props, forwardedRef) {
  const {
    styles,
    sx,
    variant = 'standard',
    onClose,
    children,
    anchor = 'left',
    headline,
    leadingActions,
    trailingActions,
    showCloseButton,
    closeIcon,
    bottomActions,
    ...other
  } = props;

  const variantStyles = sideSheetVariantContentStyles[variant];
  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'SideSheetContent',
    styles: [sideSheetContentStyles, variantStyles, styles],
  });

  const hasHeader =
    !!leadingActions || !!trailingActions || !!headline || showCloseButton;

  return (
    <PaperBase
      {...other}
      sx={[
        sideSheetContentTheme,
        globalStyles,
        combineStyles('host', `host$${anchor}`),
        sx,
      ]}
      ref={forwardedRef}
    >
      {/* This is a workaround to prevent the first focusable element from being
      focused when the side sheet is opened. */}
      {/* <button
        aria-hidden
        type='button'
        style={{ position: 'absolute', left: '-9999px' }}
      /> */}

      {hasHeader ? (
        <div
          {...getStyles(
            'header',
            !!leadingActions && 'header$withLeadingActions',
          )}
        >
          {leadingActions ? (
            <div {...getStyles('actions')}>{leadingActions}</div>
          ) : null}
          {headline ? <div {...getStyles('headline')}>{headline}</div> : null}
          {trailingActions || showCloseButton ? (
            <div {...getStyles('actions')}>
              {trailingActions}
              <IconButton
                icon={closeIcon ?? <SvgIcon icon={iconXMark} />}
                onClick={onClose}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {children ? (
        <div {...getStyles('content')}>
          {isFunction(children)
            ? children({ close: (event) => onClose?.(event) })
            : children}
        </div>
      ) : null}

      {bottomActions ? (
        <div {...getStyles('footer')}>
          <div {...getStyles('actions')}>
            {isFunction(bottomActions)
              ? bottomActions({ close: (event) => onClose?.(event) })
              : bottomActions}
          </div>
        </div>
      ) : null}
    </PaperBase>
  );
});
