import { useCallback, useState } from 'react';

import type { ISortableProps } from '../Sortable.types';
import type { IItem } from './SortableItemDemo';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Text } from '~/components/Text';
import { themeTokens } from '~/components/Theme/theme.css';
import { Sortable } from '../Sortable';

export type ISortableListDemoProps = ISortableProps<IItem>;

export const SortableListDemo: React.FC<ISortableListDemoProps> = (props) => {
  const { value: initialItems, onChange, axis, ...other } = props;
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
      <Flex
        direction={axis === 'vertical' ? 'column' : 'row'}
        gap="$sm"
        align="center"
        bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
        br="$sm"
        p="$lg"
        w="min-content"
      >
        <Sortable
          value={items}
          onChange={handleChange}
          axis={axis}
          {...other}
        />
      </Flex>

      <Flex direction="row" gap="$sm" align="center">
        <Button onClick={() => handleChange(initialItems ?? [])}>Reset</Button>
        {!props.disabled && (
          <Text variant="label">Order: {items.join(', ')}</Text>
        )}
      </Flex>
    </Flex>
  );
};
