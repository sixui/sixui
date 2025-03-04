import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delay } from '@olivierpascal/helpers';

import type { ISortableItemProps } from '~/components/SortableItem';
import type { IOmit } from '~/utils/types';
import type {
  ISortableItemRenderProps,
  ISortableProps,
} from './Sortable.types';
import { Box } from '~/components/Box';
import { Card } from '~/components/Card';
import { Flex } from '~/components/Flex';
import { SimpleGrid } from '~/components/SimpleGrid';
import { SortableItem } from '~/components/SortableItem';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { themeTokens } from '~/components/Theme/theme.css';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Sortable } from './Sortable';

const meta = {
  component: Sortable,
} satisfies Meta<ISortableProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  value: ['1', '2', '3', '4'],
  onChange: (...args) => sbHandleEvent('onChange', ...args),
} satisfies Partial<ISortableProps>;

interface ISortableItemDemoProps
  extends IOmit<ISortableItemProps, 'children'>,
    ISortableItemRenderProps {
  deletable?: boolean;
}

const SortableItemDemo: React.FC<ISortableItemDemoProps> = (props) => {
  const {
    index: _index,
    pending: _pending,
    itemPending,
    disabled,
    deletable,
    onDelete,
    ...other
  } = props;

  return (
    <SortableItem as={Card} shape="$xs" fixed={disabled} {...other}>
      <Flex align="center" justify="center" h="100%">
        <Text variant="label">{props.id}</Text>
        <Box pos="absolute">
          {itemPending && <IndeterminateCircularProgressIndicator fz="24px" />}
        </Box>
      </Flex>
      {deletable && (
        <Box
          scale="sm"
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          <IconButton
            variant="danger"
            icon={<FontAwesomeIcon icon={faXmark} />}
            onClick={onDelete}
          />
        </Box>
      )}
    </SortableItem>
  );
};

type ISortableDemoProps = ISortableProps;

const SortableSingleAxisDemo: React.FC<ISortableDemoProps> = (props) => {
  const { value: initialValue, onChange, axis, ...other } = props;
  const [value, setValue] = useState(initialValue ?? []);

  const handleChange = useCallback(
    (value: Array<string>) => {
      setValue(value);
      return onChange?.(value);
    },
    [onChange],
  );

  return (
    <Flex direction="column" gap="$xl">
      <Sortable
        as={Flex}
        direction={axis === 'vertical' ? 'column' : 'row'}
        gap="$sm"
        value={value}
        axis={axis}
        onChange={handleChange}
        bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
        br="$sm"
        p="$lg"
        w="min-content"
        {...other}
      />
      <Flex direction="row" gap="$sm" align="center">
        <Button onClick={() => handleChange(initialValue ?? [])}>Reset</Button>
        {!props.disabled && (
          <Text variant="label">Order: {value.join(', ')}</Text>
        )}
      </Flex>
    </Flex>
  );
};

const SortableGridDemo: React.FC<ISortableDemoProps> = (props) => {
  const [value, setValue] = useState(props.value ?? []);

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
        w="max-content"
        bd={`1px solid ${themeTokens.colorScheme.outlineVariant}`}
        br="$sm"
        p="$lg"
        cols={3}
        spacing="$sm"
        {...props}
        onChange={handleChange}
      />
      {!props.disabled && (
        <Text variant="label">Order: {value.join(', ')}</Text>
      )}
    </Flex>
  );
};

export const OptimisticWithSuccess: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" />
    ),
    onChange: () => delay(2000),
  },
};

export const OptimisticWithFailure: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" />
    ),
    onChange: async () => {
      await delay(2000);
      throw new Error('Failed');
    },
  },
};

export const MinChangeDuration: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" />
    ),
    minChangeDuration: 600,
  },
};

export const Deletable: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" deletable />
    ),
  },
};

export const Horizontal: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'horizontal',
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" />
    ),
  },
};

export const Vertical: IStory = {
  render: (props) => <SortableSingleAxisDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'vertical',
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="96px" h="64px" />
    ),
  },
};

export const Grid: IStory = {
  render: (props) => <SortableGridDemo {...props} />,
  args: {
    ...defaultArgs,
    itemRenderer: (props) => (
      <SortableItemDemo key={props.id} {...props} w="64px" h="96px" expanded />
    ),
  },
};

export default meta;
