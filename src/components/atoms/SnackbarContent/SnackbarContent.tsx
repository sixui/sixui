import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type {
  ISnackbarContentStyleKey,
  ISnackbarContentStyleVarKey,
} from './SnackbarContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';
import { Button } from '@/components/atoms/Button';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { IconButton } from '@/components/atoms/IconButton';

export type ISnackbarContentProps =
  IContainerProps<ISnackbarContentStyleKey> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    };
    children?: React.ReactNode;
    actionLabel?: string;
    onActionClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    onClose?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    showCloseButton?: boolean;
  };

export const SnackbarContent = forwardRef<
  HTMLDivElement,
  ISnackbarContentProps
>(function SnackbarContent(props, ref) {
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
      ref={ref}
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
