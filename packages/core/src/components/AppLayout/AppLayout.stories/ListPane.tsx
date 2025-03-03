import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import { IBoxProps } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { SearchBar } from '~/components/SearchBar';

export type IListPaneProps = IBoxProps;

export const ListPane: React.FC<IListPaneProps> = (props) => {
  const { ...other } = props;

  return (
    <Flex direction="column" rowGap="$sm" {...other}>
      <SearchBar leadingIcon={<FontAwesomeIcon icon={faSearch} />} />
      {createSequence(4).map((index) => (
        <Placeholder
          key={index}
          label="List"
          shape="$lg"
          h="96px"
          shrink={0}
          diagonals
        />
      ))}
    </Flex>
  );
};
