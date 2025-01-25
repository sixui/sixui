import type { IStateLayerThemeFactory } from './StateLayer.css';
import type { IStateLayerFactory } from './StateLayer.types';
import { Box } from '~/components/Box';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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
      variant,
      theme: stateLayerTheme,
      modifiers: {
        hovered: !context?.animating && interactions?.hovered,
        dragged: !context?.animating && interactions?.dragged,
        'static-pressed':
          (!context && interactions?.pressed) ||
          (context?.withoutRippleEffect
            ? context.interactionsContext.state.pressed
            : context?.interactionsContext.baseState?.pressed),
        'no-ripple-effect': context?.withoutRippleEffect,
        animating: context?.animating,
        disabled: context?.disabled,
      },
    });

    const handleRef = useMergeRefs(forwardedRef, context?.surfaceRef);

    return (
      <Box {...getStyles('root')} aria-hidden ref={handleRef} {...other} />
    );
  },
);

StateLayer.theme = stateLayerTheme;
StateLayer.displayName = `@sixui/${COMPONENT_NAME}`;
