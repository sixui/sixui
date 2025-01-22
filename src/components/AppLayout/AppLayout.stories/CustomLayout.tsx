import { createSequence } from '@olivierpascal/helpers';

import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { Text } from '~/components/Text';
import { AppLayout } from '../AppLayout';

const AsideContent: React.FC = () =>
  createSequence(10).map((i) => (
    <Text key={i} gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper
      nisl. In ut diam sapien. Proin orci mauris, pretium ac ante ut, porta
      fermentum ipsum. Proin at lobortis turpis, a rhoncus massa.
    </Text>
  ));

export const CustomLayout: React.FC = () => (
  <Flex direction="row" grow={1}>
    <AppLayout.Body pt="$6" pb="$6">
      <Placeholder shape="$sm" grow={1} h="$64" diagonals />
    </AppLayout.Body>

    <AppLayout.SideSheet side="right">
      <AppLayout.Aside divider>
        <AsideContent />
      </AppLayout.Aside>
    </AppLayout.SideSheet>
  </Flex>
);
