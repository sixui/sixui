import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IMultiSelectProps } from './MultiSelect.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { fruits } from '~/components/FilterableList/FilterableList.stories/fruits';
import { Flex } from '~/components/Flex';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
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

const rows: Array<IComponentPresentation<IMultiSelectDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const MultiSelectDemoShowcase = componentShowcaseFactory(MultiSelectDemo);

export const Basic: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: ['lemon', 'flowers'],
  },
};

export const Clearable: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: [fruits[1].value, fruits[3].value],
    clearable: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'app',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'Papaya',
  },
};

export const InitialContent: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <MultiSelectDemoShowcase props={props} rows={rows} />,
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

const ControlledMultiSelectDemoShowcase = componentShowcaseFactory(
  ControlledMultiSelectDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledMultiSelectDemoShowcase props={props} rows={rows} />
  ),
  args: defaultArgs,
};

export const ControlledAndClearable: IStory = {
  render: (props) => (
    <ControlledMultiSelectDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    defaultValue: [fruits[1].value],
    clearable: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => (
    <ControlledMultiSelectDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => (
    <ControlledMultiSelectDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

export default meta;
