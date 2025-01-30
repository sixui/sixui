import type { IFocusRingThemeFactory } from './FocusRing.css';
import type { IFocusRingFactory } from './FocusRing.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './FocusRing.constants';
import { focusRingTheme } from './FocusRing.css';

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

FocusRing.theme = focusRingTheme;
FocusRing.displayName = `@sixui/${COMPONENT_NAME}`;
