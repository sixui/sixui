import { forwardRef } from 'react';

import type { IBottomSheetContentProps } from './BottomSheetContent.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { bottomSheetContentStyles } from './BottomSheetContent.styles';
import { bottomSheetContentTheme } from './BottomSheetContent.stylex';
import { bottomSheetVariantContentStyles } from './variants';
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
    draggable,
    ...other
  } = props;

  const variantStyles = bottomSheetVariantContentStyles[variant];
  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'BottomSheetContent',
    styles: [bottomSheetContentStyles, variantStyles, styles],
  });

  return (
    <PaperBase
      {...other}
      sx={[bottomSheetContentTheme, globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {draggable ? <div {...getStyles('dragHandle')} /> : null}
      {isFunction(children)
        ? children({ close: (event) => onClose?.(event) })
        : children}
    </PaperBase>
  );
});
