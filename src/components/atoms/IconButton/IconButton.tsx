import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type {
  IIconButtonStyleKey,
  IIconButtonVariant,
} from './IconButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IThemeComponents } from '@/helpers/ThemeContext';
import { type IButtonStyleKey, type IButtonOwnProps, Button } from '../Button';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

const DEFAULT_TAG = 'button';

export type IIconButtonOwnProps = Omit<
  IButtonOwnProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IContainerProps<IIconButtonStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: IButtonOwnProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStyleKey>>;
    };
    variant?: IIconButtonVariant;
    toggle?: boolean;
    selected?: boolean;
    icon: React.ReactNode;
    selectedIcon?: React.ReactNode;
    'aria-label-selected'?: React.AriaAttributes['aria-label'];
  };

export type IIconButtonProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IIconButtonOwnProps>;

type IIconButtonVariantMap = {
  [key in IIconButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'StandardIconButton'
    | 'FilledIconButton'
    | 'FilledTonalIconButton'
    | 'OutlinedIconButton'
  >;
};

const variantMap: IIconButtonVariantMap = {
  standard: 'StandardIconButton',
  filled: 'FilledIconButton',
  filledTonal: 'FilledTonalIconButton',
  outlined: 'OutlinedIconButton',
};

type IIconButton = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IIconButtonProps<TRoot>,
) => React.ReactNode;

export const IconButton: IIconButton = forwardRef(function IconButton<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IIconButtonProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as = DEFAULT_TAG,
    innerStyles,
    variant = 'standard',
    toggle,
    selected,
    ...other
  } = props as IWithAsProp<IIconButtonOwnProps>;

  const theme = useComponentTheme('IconButton');
  const variantTheme = useComponentTheme(variantMap[variant]);
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme.styles, styles),
    [theme.styles, variantTheme.styles, styles],
  );

  return (
    <Button
      ref={ref}
      as={as}
      styles={asArray(innerStyles?.button)}
      sx={[
        stylesCombinator(
          'host',
          toggle ? 'host$toggle' : null,
          selected ? (toggle ? 'host$toggle$selected' : 'host$selected') : null,
        ),
        theme.vars,
        variantTheme.vars,
        sx,
      ]}
      {...other}
    />
  );

  // FIXME: delete
  // return (
  //   <div
  //     {...styleProps(
  //       [
  //         'host',
  // disabled ? 'host$disabled' : toggle ? 'host$toggle' : null,
  // !disabled && selected
  //   ? toggle
  //     ? 'host$toggle$selected'
  //     : 'host$selected'
  //   : null,
  //         props.sx,
  //       ],
  //       [theme.vars, variantTheme.vars, props.theme],
  //     )}
  //   >
  //     {hasOutline ? (
  //       <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
  //     ) : null}
  //     <div
  //       {...styleProps([
  //         'background',
  //         disabled
  //           ? 'background$disabled'
  //           : toggle
  //             ? selected
  //               ? 'background$selected'
  //               : 'background$unselected'
  //             : null,
  //       ])}
  //     />
  //     <FocusRing
  //       styles={[
  //         theme.focusRingStyles,
  //         variantTheme.focusRingStyles,
  //         ...asArray(props.focusRingStyles),
  //       ]}
  //       for={actionRef}
  //       visualState={visualState}
  //     />
  //     <StateLayer
  //       styles={[
  //         theme.stateLayerStyles,
  //         variantTheme.stateLayerStyles,
  //         ...asArray(props.stateLayerStyles),
  //       ]}
  //       for={actionRef}
  //       disabled={disabled}
  //       visualState={visualState}
  //     />

  //     <Component
  //       {...styleProps(['button'])}
  //       ref={actionRef}
  //       onClick={handleClick}
  //       readOnly={disabled}
  //       tabIndex={disabled ? -1 : 0}
  //       aria-label={
  //         toggle && selected
  //           ? props['aria-label-selected'] ?? props['aria-label']
  //           : props['aria-label']
  //       }
  //       aria-haspopup={props['aria-haspopup']}
  //       aria-expanded={props['aria-expanded']}
  //     >
  //       <span {...styleProps(['touchTarget'])} />

  //       <div
  //         {...styleProps([
  //           'icon',
  //           disabled
  //             ? 'icon$disabled'
  //             : toggle
  //               ? selected
  //                 ? 'icon$toggle$selected'
  //                 : 'icon$toggle'
  //               : null,
  //           hasOverlay ? 'invisible' : null,
  //         ])}
  //       >
  //         {icon}
  //       </div>

  //       {hasOverlay ? (
  //         <div {...styleProps(['overlay'])}>
  //           <div {...styleProps([disabled && 'icon$disabled'])}>
  //             <IndeterminateCircularProgressIndicator
  //               styles={[
  //                 theme.circularProgressIndicatorStyles,
  //                 variantTheme.circularProgressIndicatorStyles,
  //                 ...asArray(props.circularProgressIndicatorStyles),
  //               ]}
  //             />
  //           </div>
  //         </div>
  //       ) : null}
  //     </Component>
  //   </div>
  // );
});
