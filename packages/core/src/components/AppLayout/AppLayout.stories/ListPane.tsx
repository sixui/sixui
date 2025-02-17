import { createSequence } from '@olivierpascal/helpers';

import { IBoxProps } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';

export type IListPaneProps = IBoxProps;

export const ListPane: React.FC<IListPaneProps> = (props) => {
  const { ...other } = props;

  return (
    <Flex
      direction="column"
      rowGap="$2"
      h="100%"
      {...other}
      style={{ border: '2px solid red' }}
    >
      {createSequence(4).map((index) => (
        <Placeholder key={index} label="List" shape="$sm" h="$24" diagonals />
      ))}
    </Flex>
  );
};
