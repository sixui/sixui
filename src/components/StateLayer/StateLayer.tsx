import { forwardRef, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerProps } from './StateLayer.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useRipple } from './useRipple';
import { stateLayerStyles } from './StateLayer.styles';
import { stateLayerTheme } from './StateLayer.stylex';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export const StateLayer = forwardRef<HTMLDivElement, IStateLayerProps>(
  function StateLayer(props, forwardedRef) {
    const {
      styles,
      sx,
      visualState,
      for: forElementRef,
      disabled,
      children,
      ...other
    } = props;

    const componentTheme = useComponentTheme('StateLayer');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(stateLayerStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator, visualState),
      [stylesCombinator, visualState],
    );

    const { setHostRef, surfaceRef, pressed } = useRipple({
      visualState,
      for: forElementRef,
      disabled,
    });
    const handleRef = useMergeRefs([forwardedRef, setHostRef]);

    return (
      <div
        {...sxf(stateLayerTheme, componentTheme.overridenStyles, 'host', sx)}
        aria-hidden
        {...other}
        ref={handleRef}
      >
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
