import type { IStateLayerThemeFactory } from './StateLayer.css';
import type { IStateLayerFactory } from './StateLayer.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './StateLayer.constants';
import { stateLayerTheme } from './StateLayer.css';

/**
 * @see https://m3.material.io/foundations/interaction/states/overview
 */
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
        focused: !context?.animating && interactions?.focused,
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
StateLayer.displayName = `@sixui/core/${COMPONENT_NAME}`;
