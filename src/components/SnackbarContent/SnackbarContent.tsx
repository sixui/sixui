import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { ISnackbarContentProps } from './SnackbarContent.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/Elevation';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { SvgIcon } from '@/components/SvgIcon';
import { iconXMark } from '@/assets/icons';
import {
  snackbarContentElevationStyles,
  snackbarContentStyles,
} from './SnackbarContent.styles';
import { snackbarContentTheme } from './SnackbarContent.stylex';

export const SnackbarContent = forwardRef<
  HTMLDivElement,
  ISnackbarContentProps
>(function SnackbarContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    children,
    actionLabel,
    onActionClick,
    onClose,
    showCloseButton,
    ...other
  } = props;

  const componentTheme = useComponentTheme('SnackbarContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(snackbarContentStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf(
        snackbarContentTheme,
        componentTheme.overridenStyles,
        'host',
        actionLabel
          ? 'host$trailingAction'
          : onClose
            ? 'host$trailingIcon'
            : undefined,
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      <Elevation
        styles={[
          snackbarContentElevationStyles,
          ...asArray(innerStyles?.elevation),
        ]}
      />
      <div {...sxf('supportingText')}>{children}</div>

      {(actionLabel ?? showCloseButton) ? (
        <div {...sxf('actions')}>
          {actionLabel ? (
            <Button variant='snackbar' onClick={onActionClick}>
              {actionLabel}
            </Button>
          ) : null}
          {showCloseButton ? (
            <IconButton
              variant='snackbar'
              icon={<SvgIcon icon={iconXMark} />}
              onClick={onClose}
              aria-label='close'
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
