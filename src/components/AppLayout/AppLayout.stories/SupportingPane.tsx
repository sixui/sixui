import { createSequence } from '@olivierpascal/helpers';

import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export const SupportingPane: React.FC = () => (
  <Flex direction="row" gap="$2">
    {createSequence(2).map((index) => (
      <Placeholder
        key={index}
        label="supportingPane"
        shape="$sm"
        w="$32"
        h="$32"
        diagonals
      />
    ))}
  </Flex>
);
