import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '@/helpers/types';
import type {
  IFluidButtonStyleKey,
  IFluidButtonStyleVarKey,
} from './FluidButton.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  ButtonBase,
  IButtonBaseStyleKey,
  type IButtonBaseOwnProps,
} from '@/components/atoms/ButtonBase';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';

export type IFluidButtonProps = IContainerProps<IFluidButtonStyleKey> &
  IButtonBaseOwnProps & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStyleKey>>;
    };
    children?: React.ReactNode;
  };

export const FluidButton = forwardRef<HTMLButtonElement, IFluidButtonProps>(
  function FluidButton(props, forwardedRef) {
    const { styles, sx, innerStyles, children, ...other } = props;

    const { theme } = useComponentTheme('FluidButton');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IFluidButtonStyleKey, IFluidButtonStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const disabled = other.disabled || other.readOnly;

    return (
      <ButtonBase
        styles={[theme.buttonBaseStyles, ...asArray(innerStyles?.buttonBase)]}
        sx={[theme.vars, sx]}
        innerStyles={{
          ...innerStyles,
          stateLayer: [
            theme.stateLayerStyles,
            ...asArray(innerStyles?.stateLayer),
          ],
          focusRing: [
            theme.focusRingStyles,
            ...asArray(innerStyles?.focusRing),
          ],
        }}
        ref={forwardedRef}
        {...other}
      >
        <div {...sxf('textLabel', disabled && 'textLabel$disabled')}>
          {children}
        </div>
      </ButtonBase>
    );
  },
);
