import { forwardRef, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerProps } from './StateLayer.types';
import { useStyles } from '~/hooks/useStyles2';
import { useRipple } from './useRipple';
import { stateLayerStyles, stateLayerTheme } from './StateLayer.css';
import { Box } from '../Box';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export const StateLayer = forwardRef<HTMLDivElement, IStateLayerProps>(
  function StateLayer(props, forwardedRef) {
    const {
      className,
      style,
      classNames,
      visualState,
      for: forElementRef,
      disabled,
      children,
      ...other
    } = props;

    const { getStyles } = useStyles({
      name: 'StateLayer',
      className,
      style,
      classNames,
      styles: stateLayerStyles,
      theme: stateLayerTheme,
    });

    // const { combineStyles, getStyles, globalStyles } = useStyles({
    //   name: 'StateLayer',
    //   styles: [stateLayerStyles, styles],
    // });

    const rootRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState(false);

    const { surfaceRef, pressProps, animating } = useRipple({
      ref: rootRef,
    });
    const handleRef = useMergeRefs([rootRef, forwardedRef]);

    return (
      <Box
        as='button'
        {...pressProps}
        {...other}
        {...getStyles('root')}
        interactions={{
          hover: {
            onHoverChange: setHovered,
          },
        }}
        ref={handleRef}
      >
        <div
          {...getStyles([
            'rippleSurface',
            (hovered || animating) && 'rippleSurface$hover',
            animating && 'rippleSurface$pressed',
            !animating && visualState?.pressed && 'rippleSurface$pressedStatic',
            visualState?.dragged && 'rippleSurface$dragged',
          ])}
          ref={surfaceRef}
        />
        {children}
      </Box>
    );
  },
);
