import { forwardRef } from 'react';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { useStyles } from '~/hooks/useStyles';
import { isFunction } from '~/helpers/isFunction';
import { PaperBase } from '../PaperBase';
import { sideSheetContentStyles } from './SideSheetContent.styles';
import { sideSheetContentTheme } from './SideSheetContent.stylex';
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
    ...other
  } = props;

  const variantStyles = sideSheetVariantContentStyles[variant];
  const { combineStyles, globalStyles } = useStyles({
    name: 'SideSheetContent',
    styles: [sideSheetContentStyles, variantStyles, styles],
  });

  return (
    <PaperBase
      {...other}
      sx={[sideSheetContentTheme, globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {isFunction(children)
        ? children({ close: (event) => onClose?.(event) })
        : children}
    </PaperBase>
  );
});
