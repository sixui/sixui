import { createSequence } from '@olivierpascal/helpers';

import type { IBoxProps } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export type ISupportingPaneProps = IBoxProps;

export const SupportingPane: React.FC<ISupportingPaneProps> = (props) => {
  const { ...other } = props;

  return (
    <Flex direction="row" gap="$2" {...other}>
      {createSequence(2).map((index) => (
        <Placeholder
          key={index}
          label="Supporting"
          shape="$sm"
          w="$32"
          h="$32"
          diagonals
        />
      ))}
    </Flex>
  );
};
