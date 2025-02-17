import type { IAppLayoutListDetailBodyThemeFactory } from './AppLayoutListDetailBody.css';
import type { IAppLayoutListDetailBodyFactory } from './AppLayoutListDetailBody.types';
import { Box } from '~/components/Box';
import { Resizable } from '~/components/Resizable';
import { useComponentTheme, useProps } from '~/components/Theme';
import {
  ICanonicalLayoutPane,
  useCanonicalLayout,
} from '~/hooks/useCanonicalLayout';
import { componentFactory } from '~/utils/component/componentFactory';
import { AppLayoutBody } from '../AppLayoutBody';
import { COMPONENT_NAME } from './AppLayoutListDetailBody.constants';
import { appLayoutListDetailBodyTheme } from './AppLayoutListDetailBody.css';

export const AppLayoutListDetailBody =
  componentFactory<IAppLayoutListDetailBodyFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      listPane,
      detailPane,
      listDetailPane,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } =
      useComponentTheme<IAppLayoutListDetailBodyThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutListDetailBodyTheme,
      });

    const canonicalLayout = useCanonicalLayout('listDetail');

    const isHorizontal = canonicalLayout.orientation === 'horizontal';

    const renderPane = (name: ICanonicalLayoutPane['name']): React.ReactNode =>
      name === 'list' ? (
        <div {...getStyles('listPane')}>{listPane}</div>
      ) : name === 'detail' ? (
        <div {...getStyles('detailPane')}>{detailPane}</div>
      ) : name === 'listDetail' ? (
        <div {...getStyles('listDetailPane')}>{listDetailPane}</div>
      ) : undefined;

    return (
      <AppLayoutBody
        orientation={canonicalLayout.orientation}
        ref={forwardedRef}
        {...getStyles('root')}
        {...other}
      >
        {canonicalLayout.panes
          .filter((pane) => pane.type === 'body' || !pane.type)
          .map((pane) =>
            pane.resizable ? (
              <Resizable
                key={pane.name}
                bounds="window"
                defaultWidth={isHorizontal ? pane.defaultSize : undefined}
                defaultHeight={isHorizontal ? undefined : pane.defaultSize}
                orientation={isHorizontal ? 'horizontal' : 'vertical'}
              >
                {renderPane(pane.name)}
              </Resizable>
            ) : (
              <Box key={pane.name} grow={isHorizontal ? 1 : 0}>
                {renderPane(pane.name)}
              </Box>
            ),
          )}
      </AppLayoutBody>
    );
  });

AppLayoutListDetailBody.theme = appLayoutListDetailBodyTheme;
AppLayoutListDetailBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
