import { createSequence } from '@olivierpascal/helpers';

import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export const ListPane: React.FC = () => (
  <Flex direction="column" rowGap="$2">
    {createSequence(4).map((index) => (
      <Placeholder key={index} label="list" shape="$sm" h="$24" diagonals />
    ))}
  </Flex>
);
