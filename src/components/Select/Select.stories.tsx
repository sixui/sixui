import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { ISelectProps } from './Select.types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/ListItem';
import { fruits, emptyItem } from '@/components/FilterableList/fruits';
import { commonStyles } from '@/helpers/commonStyles';
import { Select } from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<ISelectProps>;

const SelectDemo: React.FC<ISelectProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValue?: string): void => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div {...stylex.props(commonStyles.verticalLayout)}>
      <Select {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </div>
  );
};

export const Basic: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const WithEmptyItem: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const ClearableWithEmptyItem: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

const ControlledSelectDemo: React.FC<ISelectProps> = (props) => {
  const [value, setValue] = useState<string>(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return <SelectDemo {...props} value={value} onChange={handleChange} />;
};

export const Controlled: IStory = {
  render: (props) => <ControlledSelectDemo {...props} />,
  args: defaultArgs,
};

export const ControlledWithEmptyItem: IStory = {
  render: (props) => <ControlledSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const ControlledAndClearable: IStory = {
  render: (props) => <ControlledSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const ControlledAndClearableWithEmptyItem: IStory = {
  render: (props) => <ControlledSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const WithErrorText: IStory = {
  render: (props) => <ControlledSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
