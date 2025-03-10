import type { ISvgIconFactory } from './SvgIcon.types';
import { Box } from '~/components/Box';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SvgIcon.constants';

export const SvgIcon = componentFactory<ISvgIconFactory>(
  (props, forwardedRef) => {
    const { icon, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Box
        aria-hidden
        dangerouslySetInnerHTML={{ __html: icon.data }}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

SvgIcon.displayName = `@sixui/core/${COMPONENT_NAME}`;
