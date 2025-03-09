import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delay } from '@olivierpascal/helpers';

import type { IOmit } from '~/utils/types';
import type { ISortableItem, ISortableProps } from './Sortable.types';
import type { ISortableItemProps } from './SortableItem';
import { Box } from '~/components/Box';
import { Card } from '~/components/Card';
import { Flex } from '~/components/Flex';
import { SimpleGrid } from '~/components/SimpleGrid';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { themeTokens } from '~/components/Theme/theme.css';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Overlayable } from '../Overlayable';
import { Sortable } from './Sortable';

type IItem = string;

const meta = {
  component: Sortable,
} satisfies Meta<ISortableProps<IItem>>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  items: ['1', '2', '3', '4'],
  onReorder: (...args) => sbHandleEvent('onReorder', ...args),
  onDelete: (...args) => sbHandleEvent('onDelete', ...args),
  onChange: (...args) => sbHandleEvent('onChange', ...args),
} satisfies Partial<ISortableProps<IItem>>;

interface ISortableItemDemoProps
  extends IOmit<ISortableItemProps, 'children'>,
    ISortableItem<IItem> {}

const SortableItemDemo: React.FC<ISortableItemDemoProps> = (props) => {
  const {
    processing: _processing,
    itemProcessing,
    disabled,
    onDelete,
    ...other
  } = props;

  return (
    <Sortable.Item
      as={Card}
      fixed={disabled}
      shape="$sm"
      w="96px"
      h="96px"
      {...other}
    >
      <Box pos="absolute" top="4px" right="8px">
        <Text variant="label">{props.id}</Text>
      </Box>

      <Flex justify="center" align="center" h="100%">
        <Overlayable
          overlay={<IndeterminateCircularProgressIndicator fz="24px" />}
          visible={itemProcessing}
        >
          <IconButton
            icon={<FontAwesomeIcon icon={faXmark} />}
            onClick={() => delay(600).then(() => onDelete?.())}
          />
        </Overlayable>
      </Flex>
    </Sortable.Item>
  );
};

type ISortableDemoProps = ISortableProps<IItem>;

const SortableListDemo: React.FC<ISortableDemoProps> = (props) => {
  const { items: initialItems, onChange, axis, ...other } = props;
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
          items={items}
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

const SortableGridDemo: React.FC<ISortableDemoProps> = (props) => {
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

export const Horizontal: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'horizontal',
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
  },
};

export const Vertical: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'vertical',
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
  },
};

export const Grid: IStory = {
  render: (props) => <SortableGridDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} expanded />
      )),
  },
};

export const OptimisticWithSuccess: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    onChange: () => delay(2000),
  },
};

export const OptimisticWithFailure: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    onChange: async () => {
      await delay(2000);
      throw new Error('Failed');
    },
  },
};

export const MinChangeDuration: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    minChangeDuration: 330,
  },
};

export default meta;
