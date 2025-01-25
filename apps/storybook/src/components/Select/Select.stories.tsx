import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISelectProps } from './Select.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { emptyItem, fruits } from '~/components/FilterableList/fruits';
import { Flex } from '~/components/Flex';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Select } from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  w: '$96',
  keepMounted: true,
} satisfies Partial<ISelectProps>;

type ISelectDemoProps = ISelectProps;

const SelectDemo: React.FC<ISelectDemoProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValue?: string): void => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Flex direction="column" gap="$2">
      <Select {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Flex>
  );
};

const rows: Array<IComponentPresentation<ISelectDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SelectDemoShowcase = componentShowcaseFactory(SelectDemo);

export const Basic: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const WithEmptyItem: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const ClearableWithEmptyItem: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

type IControlledSelectDemoProps = ISelectProps;

const ControlledSelectDemo: React.FC<IControlledSelectDemoProps> = (props) => {
  const [value, setValue] = useState<string>(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return <SelectDemo {...props} value={value} onChange={handleChange} />;
};

const ControlledSelectDemoShowcase =
  componentShowcaseFactory(ControlledSelectDemo);

export const Controlled: IStory = {
  render: (props) => <ControlledSelectDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const ControlledWithEmptyItem: IStory = {
  render: (props) => <ControlledSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const ControlledAndClearable: IStory = {
  render: (props) => <ControlledSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const ControlledAndClearableWithEmptyItem: IStory = {
  render: (props) => <ControlledSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const WithErrorText: IStory = {
  render: (props) => <ControlledSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => <SelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

export default meta;
