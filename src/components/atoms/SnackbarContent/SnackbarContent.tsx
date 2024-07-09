import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  ISnackbarContentStyleKey,
  ISnackbarContentStyleVarKey,
} from './SnackbarContent.styledefs';
import type { ISnackbarContentProps } from './SnackbarContentProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/utils/Elevation';
import { Button } from '@/components/atoms/Button';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/atoms/IconButton';

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

  const { theme } = useComponentTheme('SnackbarContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ISnackbarContentStyleKey, ISnackbarContentStyleVarKey>(
        stylesCombinator,
      ),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf(
        'host',
        actionLabel
          ? 'host$trailingAction'
          : onClose
            ? 'host$trailingIcon'
            : undefined,
        theme.vars,
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      <Elevation
        styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
      />
      <div {...sxf('supportingText')}>{children}</div>

      {actionLabel ?? showCloseButton ? (
        <div {...sxf('actions')}>
          {actionLabel ? (
            <Button variant='snackbar' onClick={onActionClick}>
              {actionLabel}
            </Button>
          ) : null}
          {showCloseButton ? (
            <IconButton
              variant='snackbar'
              icon={<XMarkIcon aria-hidden />}
              onClick={onClose}
              aria-label='close'
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
