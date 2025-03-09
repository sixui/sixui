import type { IMoveHandleThemeFactory } from './MoveHandle.css';
import type { IMoveHandleFactory } from './MoveHandle.types';
import { IconButton } from '~/components/IconButton';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MoveHandle.constants';
import { MoveHandleIndicator } from './MoveHandleIndicator';
import { moveHandleTheme } from './MoveHandle.css';

export const MoveHandle = componentFactory<IMoveHandleFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation: orientationProp,
      position,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IMoveHandleThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: moveHandleTheme,
      modifiers: {
        position,
      },
    });

    const orientation =
      (orientationProp ?? (position === 'top' || position === 'bottom'))
        ? 'horizontal'
        : 'vertical';

    return (
      <IconButton
        {...getStyles('root')}
        icon={<MoveHandleIndicator orientation={orientation} />}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

MoveHandle.theme = moveHandleTheme;
MoveHandle.displayName = `@sixui/core/${COMPONENT_NAME}`;
MoveHandle.Indicator = MoveHandleIndicator;
