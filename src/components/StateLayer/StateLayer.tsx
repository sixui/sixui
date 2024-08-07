import { forwardRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerProps } from './StateLayer.types';
import { useStyles } from '~/hooks/useStyles';
import { useRipple } from './useRipple';
import { stateLayerStyles } from './StateLayer.styles';
import { stateLayerTheme } from './StateLayer.stylex';
import { Base } from '../Base';

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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'StateLayer',
      styles: [stateLayerStyles, styles],
    });

    const { setHostRef, surfaceRef, pressed } = useRipple({
      visualState,
      for: forElementRef,
      disabled,
    });
    const handleRef = useMergeRefs([forwardedRef, setHostRef]);

    return (
      <Base
        aria-hidden
        {...other}
        sx={[stateLayerTheme, globalStyles, combineStyles('host'), sx]}
        ref={handleRef}
      >
        <div
          {...getStyles(
            'rippleSurface',
            (visualState?.hovered || pressed) && 'rippleSurface$hover',
            pressed && 'rippleSurface$pressed',
            !pressed && visualState?.pressed && 'rippleSurface$pressedStatic',
            visualState?.dragged && 'rippleSurface$dragged',
          )}
          ref={surfaceRef}
        />

        {children}
      </Base>
    );
  },
);
