import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerFactory } from './StateLayer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import {
  stateLayerStyles,
  type IStateLayerStylesFactory,
} from './StateLayer.css';

const COMPONENT_NAME = 'StateLayer';

export const StateLayer = componentFactory<IStateLayerFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, variant, context, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const { animating, interactionsContext, surfaceRef } = context;
    const { getStyles } = useStyles<IStateLayerStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: stateLayerStyles,
      style,
      variant,
      modifiers: {
        hovered: !animating && interactionsContext.state.hovered,
        dragged: !animating && interactionsContext.state.dragged,
        'static-pressed': interactionsContext.baseState?.pressed,
        animating: animating,
      },
    });

    const handleRef = useMergeRefs([forwardedRef, surfaceRef]);

    return (
      <Box
        {...other}
        {...getStyles([
          'root',
          interactionsContext.state.hovered && 'root$hover',
        ])}
        aria-hidden
        ref={handleRef}
      />
    );
  },
);

StateLayer.styles = stateLayerStyles;
StateLayer.displayName = `@sixui/${COMPONENT_NAME}`;
