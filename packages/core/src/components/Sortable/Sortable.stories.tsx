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
import { SimpleGrid } from '~/components/SimpleGrid';
import { SortableItem } from '~/components/SortableItem';
import { Text } from '~/components/Text';
import { themeTokens } from '~/components/Theme';
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

const SortableSingleAxisDemo: React.FC<ISortableDemoProps> = (props) => {
  const [value, setValue] = useState(props.initialValue ?? []);

  const handleChange = useCallback(
    (value: Array<string>) => {
      setValue(value);
      props.onChange?.(value);
    },
    [props],
  );

  return (
    <Flex direction="column" gap="$xl">
      <Sortable
        as={Flex}
        direction={props.axis === 'horizontal' ? 'row' : 'column'}
        gap="$sm"
        {...props}
        onChange={handleChange}
      />
      {!props.disabled && (
        <Text variant="label">Order: {value.join(', ')}</Text>
      )}
    </Flex>
  );
};

const SortableGridDemo: React.FC<ISortableDemoProps> = (props) => {
  const [value, setValue] = useState(props.initialValue ?? []);

  const handleChange = useCallback(
    (value: Array<string>) => {
      setValue(value);
      props.onChange?.(value);
    },
    [props],
  );

  return (
    <Flex direction="column" gap="$xl">
      <Sortable
        as={SimpleGrid}
        w="320px"
        bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
        br="$sm"
        p="$lg"
        cols={3}
        spacing="$sm"
        verticalSpacing="$sm"
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
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'horizontal',
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} w="64px" h="96px" />
    ),
  },
};

export const Vertical: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'vertical',
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} w="96px" h="64px" />
    ),
  },
};

export const Grid: IStory = {
  render: (props) => <SortableGridDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: ({ id, disabled }: ISortableItemRenderProps) => (
      <SortableItemDemo key={id} id={id} fixed={disabled} h="64px" expanded />
    ),
  },
};

export default meta;
