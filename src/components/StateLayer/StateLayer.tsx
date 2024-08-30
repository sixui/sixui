import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerFactory } from './StateLayer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import {
  stateLayerStyles,
  type IStateLayerStylesFactory,
} from './StateLayer.css';

const COMPONENT_NAME = 'StateLayer';

export const StateLayer = componentFactory<IStateLayerFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, context, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useStyles<IStateLayerStylesFactory>({
      componentName: COMPONENT_NAME,
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
StateLayer.displayName = `@sixui/${COMPONENT_NAME}`;
