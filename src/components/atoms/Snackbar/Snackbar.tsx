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
  ISnackbarStyleKey,
  ISnackbarStyleVarKey,
} from './Snackbar.styledefs';
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

export type ISnackbarProps = IContainerProps<ISnackbarStyleKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  open?: string;
  autoHideDuration?: number;
  children?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  onClose?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  long?: boolean;
};

export const Snackbar = forwardRef<HTMLDivElement, ISnackbarProps>(
  function Snackbar(props, ref) {
    const {
      styles,
      sx,
      innerStyles,
      open,
      autoHideDuration,
      // FIXME: position
      // TODO: auto layout if long text
      children,
      actionLabel,
      onActionClick,
      onClose,
      long,
      ...other
    } = props;

    const { theme } = useComponentTheme('Snackbar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ISnackbarStyleKey, ISnackbarStyleVarKey>(
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
          long && 'host$long',
          theme.vars,
          sx,
        )}
        ref={ref}
        {...other}
      >
        <Elevation
          styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
        />
        <div {...sxf('supportingText', long && 'supportingText$long')}>
          {children}
        </div>

        {actionLabel ?? onClose ? (
          <div {...sxf('actions', long && 'actions$long')}>
            {actionLabel ? (
              <Button variant='snackbar' onClick={onActionClick}>
                {actionLabel}
              </Button>
            ) : null}
            {onClose ? (
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
  },
);
