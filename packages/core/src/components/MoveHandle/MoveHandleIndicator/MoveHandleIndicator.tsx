import type { IMoveHandleIndicatorFactory } from './MoveHandleIndicator.types';
import { iconGripDotsHorizontal, iconGripDotsVertical } from '~/assets/icons';
import { SvgIcon } from '~/components/SvgIcon';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MoveHandleIndicator.constants';

export const MoveHandleIndicator =
  componentFactory<IMoveHandleIndicatorFactory>((props, forwardedRef) => {
    const { orientation, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <SvgIcon
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
