import { useCallback, useState } from 'react';

import type { ISortableProps } from '../Sortable.types';
import type { IItem } from './SortableItemDemo';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { SimpleGrid } from '~/components/SimpleGrid';
import { Text } from '~/components/Text';
import { themeTokens } from '~/components/Theme/theme.css';
import { Sortable } from '../Sortable';

export type ISortableGridDemoProps = ISortableProps<IItem>;

export const SortableGridDemo: React.FC<ISortableGridDemoProps> = (props) => {
  const { items: initialItems, onChange, ...other } = props;
  const [items, setItems] = useState(initialItems ?? []);

  const handleChange = useCallback(
    (items: Array<IItem>) => {
      setItems(items);

      return onChange?.(items);
    },
    [onChange],
  );

  return (
    <Flex direction="column" gap="$xl">
      <SimpleGrid
        w="max-content"
        bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
        br="$sm"
        p="$lg"
        cols={3}
        spacing="$sm"
      >
        <Sortable items={items} onChange={handleChange} {...other} />
      </SimpleGrid>

      <Flex direction="row" gap="$sm" align="center">
        <Button onClick={() => handleChange(initialItems ?? [])}>Reset</Button>
        {!props.disabled && (
          <Text variant="label">Order: {items.join(', ')}</Text>
        )}
      </Flex>
    </Flex>
  );
};
