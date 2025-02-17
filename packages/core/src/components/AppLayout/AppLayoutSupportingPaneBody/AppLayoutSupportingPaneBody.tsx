import { useEffect } from 'react';

import type { IAppLayoutSupportingPaneBodyThemeFactory } from './AppLayoutSupportingPaneBody.css';
import type { IAppLayoutSupportingPaneBodyFactory } from './AppLayoutSupportingPaneBody.types';
import { BottomSheet } from '~/components/BottomSheet';
import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { useToggle } from '~/hooks/useToggle';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { AppLayoutBody } from '../AppLayoutBody';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { COMPONENT_NAME } from './AppLayoutSupportingPaneBody.constants';
import { appLayoutSupportingPaneBodyTheme } from './AppLayoutSupportingPaneBody.css';

export const AppLayoutSupportingPaneBody =
  componentFactory<IAppLayoutSupportingPaneBodyFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        focusPane,
        supportingPane,
        supportingPaneAside,
        supportingPaneBottomSheet,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<IAppLayoutSupportingPaneBodyThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: appLayoutSupportingPaneBodyTheme,
        });

      const canonicalLayout = useCanonicalLayout('supportingPane');
      const [bottomSheetOpened, toggleBottomSheet] = useToggle([false, true]);
      const hasSupportingPaneAppLayoutAside = canonicalLayout.panes.some(
        (pane) => pane.type === 'sideSheet' && pane.name === 'supporting',
      );
      const hasSupportingPaneBottomSheet = canonicalLayout.panes.some(
        (pane) => pane.type === 'bottomSheet',
      );

      useEffect(() => {
        if (bottomSheetOpened && !hasSupportingPaneBottomSheet) {
          toggleBottomSheet(false);
        }
      });

      return (
        <>
          <Flex direction="row" grow={1}>
            <AppLayoutBody
              orientation={canonicalLayout.orientation}
              pt="$6"
              pb="$6"
              ref={forwardedRef}
              {...getStyles('root')}
              {...other}
            >
              {canonicalLayout.panes
                .filter((pane) => pane.type === 'body' || !pane.type)
                .map((pane) => (
                  <Box
                    key={pane.name}
                    grow={canonicalLayout.orientation === 'horizontal' ? 1 : 0}
                  >
                    {pane.name === 'focus' &&
                      (isFunction(focusPane)
                        ? focusPane({
                            hasBottomSheet: hasSupportingPaneBottomSheet,
                            bottomSheetOpened,
                            toggleBottomSheet,
                          })
                        : focusPane)}
                    {pane.name === 'supporting' && supportingPane}
                  </Box>
                ))}
            </AppLayoutBody>

            {hasSupportingPaneAppLayoutAside && supportingPaneAside && (
              <AppLayoutSideSheet side="right" divider>
                {supportingPaneAside}
              </AppLayoutSideSheet>
            )}
          </Flex>

          {hasSupportingPaneBottomSheet && supportingPaneBottomSheet && (
            <BottomSheet
              showCloseButton
              opened={bottomSheetOpened}
              onClose={() => {
                toggleBottomSheet(false);
              }}
            >
              {supportingPaneBottomSheet}
            </BottomSheet>
          )}
        </>
      );
    },
  );

AppLayoutSupportingPaneBody.theme = appLayoutSupportingPaneBodyTheme;
AppLayoutSupportingPaneBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
