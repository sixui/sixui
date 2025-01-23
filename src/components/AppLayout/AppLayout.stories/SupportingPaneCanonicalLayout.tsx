import { useEffect } from 'react';

import { BottomSheet } from '~/components/BottomSheet';
import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { isFunction } from '~/helpers/isFunction';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { useToggle } from '~/hooks/useToggle';
import { AppLayout } from '../AppLayout';

export interface ISupportingPaneCanonicalLayoutFocusPaneRendererProps {
  hasBottomSheet: boolean;
  bottomSheetOpened: boolean;
  toggleBottomSheet: (opened?: boolean) => void;
}

export interface ISupportingPaneCanonicalLayoutProps {
  focusPane:
    | React.ReactNode
    | ((
        props: ISupportingPaneCanonicalLayoutFocusPaneRendererProps,
      ) => React.ReactNode);
  supportingPane: React.ReactNode;
  supportingPaneAside: React.ReactNode;
  supportingPaneBottomSheet: React.ReactNode;
}

export const SupportingPaneCanonicalLayout: React.FC<
  ISupportingPaneCanonicalLayoutProps
> = (props) => {
  const {
    focusPane,
    supportingPane,
    supportingPaneAside,
    supportingPaneBottomSheet,
  } = props;

  const canonicalLayout = useCanonicalLayout('supportingPane');

  const [bottomSheetOpened, toggleBottomSheet] = useToggle([false, true]);
  const hasSupportingPaneAppLayoutAside = canonicalLayout.panes.some(
    (pane) => pane.type === 'aside' && pane.name === 'supporting',
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
        <AppLayout.Body
          orientation={canonicalLayout.orientation}
          pt="$6"
          pb="$6"
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
        </AppLayout.Body>

        {/* FIXME: {hasSupportingPaneAppLayoutAside && supportingPaneAside && (
          <AppLayout.SideSheet side="right" divider>
            {supportingPaneAside}
          </AppLayout.SideSheet>
        )} */}
      </Flex>

      {hasSupportingPaneBottomSheet && supportingPaneBottomSheet && (
        <BottomSheet
          showCloseButton
          opened={bottomSheetOpened}
          onClose={() => toggleBottomSheet(false)}
        >
          {supportingPaneBottomSheet}
        </BottomSheet>
      )}
    </>
  );
};
