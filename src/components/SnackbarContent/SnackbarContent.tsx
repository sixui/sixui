import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { ISnackbarContentProps } from './SnackbarContent.types';
import { useStyles } from '~/hooks/useStyles';
import { iconXMark } from '~/assets/icons';
import { Elevation } from '../Elevation';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { Base } from '../Base';
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

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'SnackbarContent',
    styles: [snackbarContentStyles, styles],
  });

  return (
    <Base
      {...other}
      sx={[
        snackbarContentTheme,
        globalStyles,
        combineStyles(
          'host',
          actionLabel
            ? 'host$trailingAction'
            : onClose
              ? 'host$trailingIcon'
              : undefined,
        ),
        sx,
      ]}
      ref={forwardedRef}
    >
      <Elevation
        styles={[
          snackbarContentElevationStyles,
          ...asArray(innerStyles?.elevation),
        ]}
      />
      <div {...getStyles('supportingText')}>{children}</div>

      {(actionLabel ?? showCloseButton) ? (
        <div {...getStyles('actions')}>
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
    </Base>
  );
});
