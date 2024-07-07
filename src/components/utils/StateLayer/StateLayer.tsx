import { forwardRef, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IStateLayerStyleKey,
  IStateLayerStyleVarKey,
} from './StateLayer.styledefs';
import type { IVisualState } from '@/components/utils/VisualState';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useRipple } from './useRipple';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export type IStateLayerProps = IContainerProps<IStateLayerStyleKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const StateLayer = forwardRef<HTMLDivElement, IStateLayerProps>(
  function StateLayer(props, forwardedRef) {
    const {
      styles,
      sx,
      visualState,
      for: forElementRef,
      disabled,
      children,
    } = props;

    const { theme } = useComponentTheme('StateLayer');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStateLayerStyleKey, IStateLayerStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const { setHostRef, surfaceRef, pressed } = useRipple({
      visualState,
      for: forElementRef,
      disabled,
    });
    const handleRef = useMergeRefs([forwardedRef, setHostRef]);

    return (
      <div ref={handleRef} {...sxf('host', theme.vars, sx)}>
        <div
          {...sxf(
            'rippleSurface',
            visualState?.hovered && 'rippleSurface$hover',
            pressed && 'rippleSurface$pressed',
            !pressed && visualState?.pressed && 'rippleSurface$pressedStatic',
            visualState?.dragged && 'rippleSurface$dragged',
          )}
          ref={surfaceRef}
        />

        {children}
      </div>
    );
  },
);
