import { forwardRef } from 'react';

import type { IStateLayerProps } from './StateLayer.types';
import { useStyles } from '~/hooks/useStyles2';
import { stateLayerStyles, stateLayerTheme } from './StateLayer.css';
import { Box } from '../Box';
import { useMergeRefs } from '@floating-ui/react';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export const StateLayer = forwardRef<HTMLDivElement, IStateLayerProps>(
  function StateLayer(props, forwardedRef) {
    const { className, style, classNames, context, ...other } = props;

    const { getStyles } = useStyles({
      name: 'StateLayer',
      className,
      style,
      classNames,
      styles: stateLayerStyles,
      theme: stateLayerTheme,
    });

    const modifiers = {
      hovered: !context.animating && context.state?.hovered,
      dragged: !context.animating && context.state?.dragged,
      staticPressed: context.staticState?.pressed,
      animating: context.animating,
    };

    const handleRef = useMergeRefs([forwardedRef, context.surfaceRef]);

    return (
      <Box
        {...other}
        {...getStyles('root')}
        modifiers={modifiers}
        ref={handleRef}
      />
    );
  },
);
