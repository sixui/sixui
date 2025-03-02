import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import type { ISortableItemProps } from '~/components/SortableItem';
import type { IOmit } from '~/utils/types';
import type {
  ISortableItemRenderProps,
  ISortableProps,
} from './Sortable.types';
import { Card } from '~/components/Card';
import { Flex } from '~/components/Flex';
import { SortableItem } from '~/components/SortableItem';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Sortable } from './Sortable';

const meta = {
  component: Sortable,
} satisfies Meta<ISortableProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  initialValue: ['1', '2', '3', '4'],
  onChange: (...args) => sbHandleEvent('onChange', ...args),
} satisfies Partial<ISortableProps>;

type ISortableItemDemoProps = IOmit<ISortableItemProps, 'children'>;

const SortableItemDemo: React.FC<ISortableItemDemoProps> = (props) => (
  <SortableItem as={Card} shape="$xs" {...props}>
    <Flex align="center" justify="center" h="100%">
      <Text variant="label">{props.id}</Text>
    </Flex>
  </SortableItem>
);

type ISortableDemoProps = ISortableProps;

const SortableDemo: React.FC<ISortableDemoProps> = (props) => {
  const [value, setValue] = useState(props.initialValue ?? []);

  const handleChange = useCallback(
    (value: Array<string>) => {
      setValue(value);

      props.onChange?.(value);
    },
    [props],
  );

  return (
    <Flex direction="column" gap="$6">
      <Sortable
        as={Flex}
        direction={props.axis === 'horizontal' ? 'row' : 'column'}
        gap="$2"
        {...props}
        onChange={handleChange}
      />
      {!props.disabled && (
        <Text variant="label">Order: {value.join(', ')}</Text>
      )}
    </Flex>
  );
};

export const Horizontal: IStory = {
  render: (props) => <SortableDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'horizontal',
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} w="$16" h="$24" />
    ),
  },
};

export const Vertical: IStory = {
  render: (props) => <SortableDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'vertical',
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} w="$24" h="$16" />
    ),
  },
};

export const Grid: IStory = {
  render: (props) => <SortableDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} w="$24" h="$16" />
    ),
  },
};

// TODO: grid
// TODO: with delay and optimistic change
// TODO: remove

export default meta;
