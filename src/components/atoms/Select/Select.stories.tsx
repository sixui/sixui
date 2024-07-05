import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { fruits } from '@/components/atoms/FilterableList/fruits';
import { Select, type ISelectProps } from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<ISelectProps>;

export const Basic: IStory = {
  render: (props) => <Select {...props} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
  },
};

export const Clearable: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const CanFilter: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <Select {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

const ControlledSelect: React.FC<ISelectProps> = (props) => {
  const [value, setValue] = useState<string>(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return <Select {...props} value={value} onChange={handleChange} />;
};

export const Controlled: IStory = {
  render: (props) => <ControlledSelect {...props} />,
  args: defaultArgs,
};

export const ControlledAndClearable: IStory = {
  render: (props) => <ControlledSelect {...props} />,
  args: {
    ...defaultArgs,
    clearable: true,
  },
};

export default meta;
