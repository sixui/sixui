import { forwardRef } from 'react';

import type { IBottomSheetContentProps } from './BottomSheetContent.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { bottomsheetcontentStyles } from './BottomSheetContent.styles';
import { bottomSheetContentTheme } from './BottomSheetContent.stylex';
import { bottomsheetVariantContentStyles } from './variants';
import { isFunction } from '~/helpers/isFunction';

export const BottomSheetContent = forwardRef<
  HTMLDivElement,
  IBottomSheetContentProps
>(function BottomSheetContent(props, forwardedRef) {
  const {
    styles,
    sx,
    variant = 'standard',
    onClose,
    children,
    ...other
  } = props;

  const variantStyles = bottomsheetVariantContentStyles[variant];
  const { combineStyles, globalStyles } = useStyles({
    name: 'BottomSheetContent',
    styles: [bottomsheetcontentStyles, variantStyles, styles],
  });

  return (
    <PaperBase
      {...other}
      sx={[bottomSheetContentTheme, globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {isFunction(children)
        ? children({ close: (event) => onClose?.(event) })
        : children}
    </PaperBase>
  );
});
