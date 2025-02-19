import type { IAppLayoutFeedBodyThemeFactory } from './AppLayoutFeedBody.css';
import type { IAppLayoutFeedBodyFactory } from './AppLayoutFeedBody.types';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { AppLayoutBody } from '../AppLayoutBody';
import { COMPONENT_NAME } from './AppLayoutFeedBody.constants';
import { appLayoutFeedBodyTheme } from './AppLayoutFeedBody.css';

export const AppLayoutFeedBody = componentFactory<IAppLayoutFeedBodyFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      feedPane,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IAppLayoutFeedBodyThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutFeedBodyTheme,
    });

    const canonicalLayout = useCanonicalLayout('feed');

    const grid = !canonicalLayout.orientation;

    return (
      <AppLayoutBody
        orientation={canonicalLayout.orientation}
        ref={forwardedRef}
        {...getStyles('root')}
        {...other}
      >
        {isFunction(feedPane) ? feedPane({ grid }) : feedPane}
      </AppLayoutBody>
    );
  },
);

AppLayoutFeedBody.theme = appLayoutFeedBodyTheme;
AppLayoutFeedBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
