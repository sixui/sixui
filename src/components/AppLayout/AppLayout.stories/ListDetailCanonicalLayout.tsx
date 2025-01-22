import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { AppLayout } from '../AppLayout';

export interface IListDetailCanonicalLayoutProps {
  listPane?: React.ReactNode;
  detailPane?: React.ReactNode;
  listDetailPane?: React.ReactNode;
}

export const ListDetailCanonicalLayout: React.FC<
  IListDetailCanonicalLayoutProps
> = (props) => {
  const { listPane, detailPane, listDetailPane } = props;

  const canonicalLayout = useCanonicalLayout('listDetail');

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
                {pane.name === 'list' && listPane}
                {pane.name === 'detail' && detailPane}
                {pane.name === 'listDetail' && listDetailPane}
              </Box>
            ))}
        </AppLayout.Body>
      </Flex>
    </>
  );
};
