import type { IFocusRingFactory } from './FocusRing.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import { focusRingStyles, type IFocusRingStylesFactory } from './FocusRing.css';

const COMPONENT_NAME = 'FocusRing';

export const FocusRing = componentFactory<IFocusRingFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      variant = 'outward',
      interactionsState,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useStyles<IFocusRingStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: focusRingStyles,
      style,
      variant,
    });

    const modifiers = {
      visible: interactionsState.focused,
    };

    return (
      <Box
        {...other}
        {...getStyles('root')}
        aria-hidden
        modifiers={modifiers}
        ref={forwardedRef}
      />
    );
  },
);

FocusRing.styles = focusRingStyles;
FocusRing.displayName = `@sixui/${COMPONENT_NAME}`;
