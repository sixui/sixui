import type { IAnimatedSlotThemeFactory } from './AnimatedSlot.css';
import type { IAnimatedSlotFactory } from './AnimatedSlot.types';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { animatedSlotTheme } from './AnimatedSlot.css';

const COMPONENT_NAME = 'AnimatedSlot';

export const AnimatedSlot = componentFactory<IAnimatedSlotFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      opened,
      loading,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IAnimatedSlotThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: animatedSlotTheme,
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('label')}>{children}</div>
      </Paper>
    );
  },
);

AnimatedSlot.theme = animatedSlotTheme;
AnimatedSlot.displayName = `@sixui/${COMPONENT_NAME}`;
