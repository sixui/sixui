import type { IMoveHandleThemeFactory } from './MoveHandle.css';
import type { IMoveHandleFactory } from './MoveHandle.types';
import { iconGripDotsHorizontal, iconGripDotsVertical } from '~/assets/icons';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MoveHandle.constants';
import { moveHandleTheme } from './MoveHandle.css';

export const MoveHandle = componentFactory<IMoveHandleFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      icon: iconProp,
      orientation = 'horizontal',
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
    });

    const icon = iconProp ?? (
      <SvgIcon
        icon={
          orientation === 'horizontal'
            ? iconGripDotsHorizontal
            : iconGripDotsVertical
        }
      />
    );

    return (
      <IconButton
        {...getStyles('root')}
        icon={icon}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

MoveHandle.theme = moveHandleTheme;
MoveHandle.displayName = `@sixui/core/${COMPONENT_NAME}`;
