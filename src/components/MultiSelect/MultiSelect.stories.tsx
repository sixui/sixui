import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IMultiSelectProps } from './MultiSelect.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { fruits } from '../FilterableList/fruits';
import { Flex } from '../Flex';
import { ListItem } from '../ListItem';
import { MultiSelect } from './MultiSelect';

const meta = {
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  w: '$128',
  keepMounted: true,
} satisfies Partial<IMultiSelectProps>;

type IMultiSelectDemoProps = IMultiSelectProps;

const MultiSelectDemo: React.FC<IMultiSelectDemoProps> = (props) => {
  const [value, setValue] = useState<Array<string> | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValues?: Array<string>): void => {
    setValue(newValues);
    props.onChange?.(newValues);
  };

  return (
    <Flex direction="column" gap="$2">
      <MultiSelect {...props} onChange={handleChange} />
      <div>
        Values:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: ['lemon', 'flowers'],
  },
};

export const Clearable: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: [fruits[1].value, fruits[3].value],
    clearable: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'app',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'Papaya',
  },
};

export const InitialContent: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

const ControlledMultiSelectDemo: React.FC<IMultiSelectProps> = (props) => {
  const [value, setValue] = useState<Array<string>>(props.defaultValue ?? []);

  const handleChange = (newValue?: Array<string>): void => {
    setValue(newValue ?? []);
    props.onChange?.(newValue);
  };

  return <MultiSelectDemo {...props} value={value} onChange={handleChange} />;
};

export const Controlled: IStory = {
  render: (props) => <ControlledMultiSelectDemo {...props} />,
  args: defaultArgs,
};

export const ControlledAndClearable: IStory = {
  render: (props) => <ControlledMultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: [fruits[1].value],
    clearable: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <ControlledMultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => <ControlledMultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

export default meta;
