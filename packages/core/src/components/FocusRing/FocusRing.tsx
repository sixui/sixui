import type { IFocusRingThemeFactory } from './FocusRing.css';
import type { IFocusRingFactory } from './FocusRing.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FocusRing.constants';
import { focusRingTheme } from './FocusRing.css';

/**
 * @see https://m3.material.io/foundations/interaction/states/applying-states#9edb181a-ed5e-4961-b3d0-cae33125a4a9
 */
export const FocusRing = componentFactory<IFocusRingFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'outward',
      visible,
      interactions,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IFocusRingThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: focusRingTheme,
      modifiers: {
        visible: visible ?? interactions?.focused,
      },
    });

    return (
      <Box
        {...getStyles('root')}
        aria-hidden
        ref={forwardedRef}
        interactions={interactions}
        {...other}
      />
    );
  },
);

FocusRing.displayName = `@sixui/core/${COMPONENT_NAME}`;
FocusRing.theme = focusRingTheme;
