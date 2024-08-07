import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IMultiSelectProps } from './MultiSelect.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ListItem } from '../ListItem';
import { fruits } from '../FilterableList/fruits';
import { MultiSelect } from './MultiSelect';
import { Stack } from '../Stack';

const meta = {
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<IMultiSelectProps>;

const MultiSelectDemo: React.FC<IMultiSelectProps> = (props) => {
  const [value, setValue] = useState<Array<string> | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValues?: Array<string>): void => {
    setValue(newValues);
    props.onChange?.(newValues);
  };

  return (
    <Stack align='stretch' gap={2}>
      <MultiSelect {...props} onChange={handleChange} />
      <div>
        Values:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Stack>
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
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelectDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'My great movie',
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
