import { FloatingOverlay, useTransitionStatus } from '@floating-ui/react';

import type { IScrimThemeFactory } from './Scrim.css';
import type { IScrimFactory } from './Scrim.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { scrimTheme } from './Scrim.css';

const COMPONENT_NAME = 'Scrim';

export const Scrim = polymorphicComponentFactory<IScrimFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'darken',
      floatingContext,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const transitionStatus = useTransitionStatus(floatingContext, {
      duration: 150, // motionTokens.duration$short3
    });

    const { getStyles } = useComponentTheme<IScrimThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: scrimTheme,
      variant,
      modifiers: {
        status: transitionStatus.status,
      },
    });

    if (!transitionStatus.isMounted) {
      return null;
    }

    return (
      <FloatingOverlay {...other} {...getStyles('root')} ref={forwardedRef}>
        {children}
      </FloatingOverlay>
    );
  },
);
