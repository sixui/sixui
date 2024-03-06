import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  IStateLayerStyleKey,
  IStateLayerStyleVarKey,
} from './StateLayer.styledefs';
import type { IVisualState } from '@/hooks/useVisualState';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useRipple } from './useRipple';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export type IStateLayerProps = IContainerProps<IStateLayerStyleKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
};

export const StateLayer = forwardRef<HTMLDivElement, IStateLayerProps>(
  function StateLayer(props, ref) {
    const { styles, sx, visualState, for: forElementRef, disabled } = props;

    const theme = useComponentTheme('StateLayer');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
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
    const handleRef = useForkRef(ref, setHostRef);

    return (
      <div ref={handleRef} {...styleProps(['host', sx], [theme.vars])}>
        <div
          {...styleProps([
            'rippleSurface',
            visualState?.hovered && 'rippleSurface$hover',
            pressed && 'rippleSurface$pressed',
            !pressed && visualState?.pressed && 'rippleSurface$pressedStatic',
            visualState?.dragged && 'rippleSurface$dragged',
          ])}
          ref={surfaceRef}
        />
      </div>
    );
  },
);
