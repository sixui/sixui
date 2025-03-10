import type { IAppLayoutFeedBodyFactory } from './AppLayoutFeedBody.types';
import { useProps } from '~/components/Theme';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { AppLayoutBody } from '../AppLayoutBody';
import { COMPONENT_NAME } from './AppLayoutFeedBody.constants';

export const AppLayoutFeedBody = componentFactory<IAppLayoutFeedBodyFactory>(
  (props, forwardedRef) => {
    const { feedPane, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const canonicalLayout = useCanonicalLayout('feed');

    const grid = !canonicalLayout.orientation;

    return (
      <AppLayoutBody
        orientation={canonicalLayout.orientation}
        ref={forwardedRef}
        {...other}
      >
        {isFunction(feedPane) ? feedPane({ grid }) : feedPane}
      </AppLayoutBody>
    );
  },
);

AppLayoutFeedBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
