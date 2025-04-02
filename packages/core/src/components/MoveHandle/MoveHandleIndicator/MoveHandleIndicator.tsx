import type { IMoveHandleIndicatorThemeFactory } from './MoveHandleIndicator.css';
import type { IMoveHandleIndicatorFactory } from './MoveHandleIndicator.types';
import { iconGripDotsHorizontal, iconGripDotsVertical } from '~/assets/icons';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MoveHandleIndicator.constants';
import { moveHandleIndicatorTheme } from './MoveHandleIndicator.css';

export const MoveHandleIndicator =
  componentFactory<IMoveHandleIndicatorFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation,
      disabled,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IMoveHandleIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: moveHandleIndicatorTheme,
    });

    return (
      <SvgIcon
        {...getStyles('root', {
          modifiers: {
            disabled,
          },
        })}
        ref={forwardedRef}
        {...other}
        icon={
          orientation === 'horizontal'
            ? iconGripDotsHorizontal
            : iconGripDotsVertical
        }
      />
    );
  });

MoveHandleIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
