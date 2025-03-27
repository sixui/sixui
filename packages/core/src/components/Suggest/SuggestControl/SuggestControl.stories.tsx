import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISuggestControlProps } from './SuggestControl.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import {
  emptyItem,
  fruits,
} from '~/components/FilterableList/FilterableList.stories/fruits';
import { Flex } from '~/components/Flex';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SuggestControl } from './SuggestControl';

const meta = {
  component: SuggestControl,
} satisfies Meta<typeof SuggestControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  w: '384px',
  keepMounted: true,
} satisfies Partial<ISuggestControlProps>;

type ISuggestControlDemoProps = ISuggestControlProps;

const SuggestControlDemo: React.FC<ISuggestControlDemoProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValue?: string): void => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Flex direction="column" gap="$sm">
      <SuggestControl {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Flex>
  );
};

const rows: Array<IComponentPresentation<ISuggestControlDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SuggestControlDemoShowcase = componentShowcaseFactory(SuggestControlDemo);

export const Basic: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const Skeleton: IStory = {
  render: () => <SuggestControl.Skeleton w="384px" />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const WithEmptyItem: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
  },
};

export const Clearable: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
  },
};

export const ClearableWithEmptyItem: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const NoResults: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestControlDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

const ControlledSuggestControlDemo: React.FC<ISuggestControlProps> = (
  props,
) => {
  const [value, setValue] = useState(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return (
    <SuggestControlDemo {...props} value={value} onChange={handleChange} />
  );
};

const ControlledSuggestControlDemoShowcase = componentShowcaseFactory(
  ControlledSuggestControlDemo,
);

export const Controlled: IStory = {
  render: (props) => (
    <ControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: defaultArgs,
};

export const ControlledWithEmptyItem: IStory = {
  render: (props) => (
    <ControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const ControlledAndClearable: IStory = {
  render: (props) => (
    <ControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    defaultValue: fruits[1]!.value,
    clearable: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => (
    <ControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => (
    <ControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

const AsyncControlledSuggestControlDemo: React.FC<ISuggestControlProps> = (
  props,
) => {
  const [items, setItems] = useState<Array<IFilterableListItem>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryChange = (): void => {
    setItems([]);
    setIsLoading(true);

    setTimeout(() => {
      setItems(fruits);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SuggestControlDemo
      {...props}
      onQueryChange={handleQueryChange}
      items={items}
      loading={isLoading}
    />
  );
};

const AsyncControlledSuggestControlDemoShowcase = componentShowcaseFactory(
  AsyncControlledSuggestControlDemo,
);

export const AsyncGrid: IStory = {
  render: (props) => (
    <AsyncControlledSuggestControlDemoShowcase props={props} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
    items: [],
  },
};

export default meta;
