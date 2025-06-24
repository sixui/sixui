import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISelectControlProps } from './SelectControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import {
  emptyItem,
  fruits,
} from '~/components/FilterableList/FilterableList.stories/fruits';
import { Flex } from '~/components/Flex';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SelectControl } from './SelectControl';

const meta = {
  component: SelectControl,
} satisfies Meta<typeof SelectControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  w: '384px',
  keepMounted: true,
} satisfies Partial<ISelectControlProps>;

type ISelectControlDemoProps = ISelectControlProps;

const SelectControlDemo: React.FC<ISelectControlDemoProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValue?: string): void => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Flex direction="column" gap="$sm">
      <SelectControl {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Flex>
  );
};

const rows: Array<IComponentPresentation<ISelectControlDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SelectControlDemoShowcase = componentShowcaseFactory(SelectControlDemo);

export const Basic: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const Skeleton: IStory = {
  render: () => <SelectControl.Skeleton w="384px" />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const WithEmptyItem: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
  },
};

export const ClearableWithEmptyItem: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

type IControlledSelectControlDemoProps = ISelectControlProps;

const ControlledSelectControlDemo: React.FC<
  IControlledSelectControlDemoProps
> = (props) => {
  const [value, setValue] = useState<string>(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return <SelectControlDemo {...props} value={value} onChange={handleChange} />;
};

const ControlledSelectControlDemoShowcase = componentShowcaseFactory(
  ControlledSelectControlDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledSelectControlDemoShowcase props={props} rows={rows} />
  ),
  args: defaultArgs,
};

export const ControlledWithEmptyItem: IStory = {
  render: (props) => (
    <ControlledSelectControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const ControlledAndClearable: IStory = {
  render: (props) => (
    <ControlledSelectControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
  },
};

export const ControlledAndClearableWithEmptyItem: IStory = {
  render: (props) => (
    <ControlledSelectControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const WithErrorText: IStory = {
  render: (props) => (
    <ControlledSelectControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => <SelectControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

export default meta;
