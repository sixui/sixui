import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { ISnackbarContentProps } from './SnackbarContent.types';
import { useStyles } from '~/hooks/useStyles';
import { iconXMark } from '~/assets/icons';
import { Elevation } from '../Elevation';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import {
  snackbarContentElevationStyles,
  snackbarContentStyles,
} from './SnackbarContent.styles';
import { snackbarContentTheme } from './SnackbarContent.stylex';
import { Stack } from '../Stack';

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
    <Stack
      {...other}
      horizontal
      align='center'
      gap={3}
      wrap
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
        <Stack horizontal gap={2} sx={combineStyles('actions')}>
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
        </Stack>
      ) : null}
    </Stack>
  );
});
