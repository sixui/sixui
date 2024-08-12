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
    placement = 'left',
    iconButtons,
    headline,
    showCloseButton,
    closeIcon,
    ...other
  } = props;

  const variantStyles = sideSheetVariantContentStyles[variant];
  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'SideSheetContent',
    styles: [sideSheetContentStyles, variantStyles, styles],
  });

  const hasHeader = !!iconButtons || !!headline || showCloseButton;

  return (
    <PaperBase
      {...other}
      sx={[
        sideSheetContentTheme,
        globalStyles,
        combineStyles('host', `host$${placement}`),
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
        <div {...getStyles('header', !!iconButtons && 'header$withIcons')}>
          {iconButtons ? (
            <div {...getStyles('actions')}>{iconButtons}</div>
          ) : null}
          {headline ? <div {...getStyles('headline')}>{headline}</div> : null}
          {showCloseButton ? (
            <IconButton
              icon={closeIcon ?? <SvgIcon icon={iconXMark} />}
              onClick={onClose}
            />
          ) : null}
        </div>
      ) : null}
      {isFunction(children)
        ? children({ close: (event) => onClose?.(event) })
        : children}
    </PaperBase>
  );
});
