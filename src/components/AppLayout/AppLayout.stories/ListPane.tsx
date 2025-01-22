import { createSequence } from '@olivierpascal/helpers';

import { IBoxProps } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export type IListPaneProps = IBoxProps;

export const ListPane: React.FC<IListPaneProps> = (props) => {
  const { ...other } = props;

  return (
    <Flex direction="column" rowGap="$2" {...other}>
      {createSequence(4).map((index) => (
        <Placeholder key={index} label="list" shape="$sm" h="$24" diagonals />
      ))}
    </Flex>
  );
};
