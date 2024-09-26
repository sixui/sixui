import type { IFocusRingThemeFactory } from './FocusRing.css';
import type { IFocusRingFactory } from './FocusRing.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { focusRingTheme } from './FocusRing.css';

const COMPONENT_NAME = 'FocusRing';

export const FocusRing = componentFactory<IFocusRingFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'outward',
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
      theme: focusRingTheme,
      variant,
      modifiers: {
        visible: interactions?.focused,
      },
    });

    return (
      <Box
        {...getStyles('root')}
        interactions={interactions}
        aria-hidden
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

FocusRing.theme = focusRingTheme;
FocusRing.displayName = `@sixui/${COMPONENT_NAME}`;
