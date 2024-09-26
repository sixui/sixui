import { useMergeRefs } from '@floating-ui/react';

import type { IStateLayerThemeFactory } from './StateLayer.css';
import type { IStateLayerFactory } from './StateLayer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { stateLayerTheme } from './StateLayer.css';

const COMPONENT_NAME = 'StateLayer';

export const StateLayer = componentFactory<IStateLayerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      context,
      interactions: interactionsProp,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const interactions = interactionsProp ?? context?.interactionsContext.state;
    const { getStyles } = useComponentTheme<IStateLayerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: stateLayerTheme,
      variant,
      modifiers: {
        hovered: !context?.animating && interactions?.hovered,
        dragged: !context?.animating && interactions?.dragged,
        'static-pressed':
          (!context && interactions?.pressed) ||
          context?.interactionsContext.baseState?.pressed,
        animating: context?.animating,
      },
    });

    const handleRef = useMergeRefs([forwardedRef, context?.surfaceRef]);

    return (
      <Box {...getStyles('root')} aria-hidden ref={handleRef} {...other} />
    );
  },
);

StateLayer.theme = stateLayerTheme;
StateLayer.displayName = `@sixui/${COMPONENT_NAME}`;
