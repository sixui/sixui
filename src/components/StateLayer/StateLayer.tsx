import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerFactory } from './StateLayer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import {
  stateLayerTheme,
  type IStateLayerThemeFactory,
} from './StateLayer.css';

const COMPONENT_NAME = 'StateLayer';

export const StateLayer = componentFactory<IStateLayerFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, context, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    const { animating, interactionsContext, surfaceRef } = context;
    const { getStyles } = useComponentTheme<IStateLayerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: stateLayerTheme,
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

StateLayer.theme = stateLayerTheme;
StateLayer.displayName = `@sixui/${COMPONENT_NAME}`;
