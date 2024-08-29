import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerFactory } from './StateLayer.types';
import { componentFactory } from '~/utils/componentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { Box } from '../Box';
import {
  stateLayerStyles,
  type IStateLayerStylesFactory,
} from './StateLayer.css';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export const StateLayer = componentFactory<IStateLayerFactory>(
  function StateLayer(props, forwardedRef) {
    const { classNames, className, style, context, ...other } = useProps({
      componentName: 'StateLayer',
      props,
    });

    const { getStyles } = useStyles<IStateLayerStylesFactory>({
      componentName: 'StateLayer',
      classNames,
      className,
      styles: stateLayerStyles,
      style,
    });

    const { interactions } = context;
    const modifiers = {
      hovered: !context.animating && interactions.state.hovered,
      dragged:
        !context.animating &&
        !interactions.state.hovered &&
        interactions.state.dragged,
      'static-pressed': interactions.staticState?.pressed,
      animating: context.animating,
    };

    const handleRef = useMergeRefs([forwardedRef, context.surfaceRef]);

    return (
      <Box
        {...other}
        {...getStyles('root')}
        aria-hidden
        modifiers={modifiers}
        ref={handleRef}
      />
    );
  },
);

StateLayer.styles = stateLayerStyles;
StateLayer.displayName = '@sixui/StateLayer';
