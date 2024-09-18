import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IFilterableListItem } from '../FilterableList';
import type { ISuggestProps } from './Suggest.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { emptyItem, fruits } from '../FilterableList/fruits';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { Suggest } from './Suggest';

const meta = {
  component: Suggest,
} satisfies Meta<typeof Suggest>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<ISuggestProps>;

const SuggestDemo: React.FC<ISuggestProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(
    props.value ?? props.defaultValue,
  );

  const handleChange = (newValue?: string): void => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Stack gap={2}>
      <Suggest {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </Stack>
  );
};

export const Basic: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: defaultArgs,
};

export const Empty: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const WithEmptyItem: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const DefaultValue: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
  },
};

export const Clearable: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const ClearableWithEmptyItem: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
    items: [emptyItem, ...fruits],
  },
};

export const NoResults: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

const ControlledSuggestDemo: React.FC<ISuggestProps> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? '');

  const handleChange = (newValue?: string): void => {
    setValue(newValue ?? '');
    props.onChange?.(newValue);
  };

  return <SuggestDemo {...props} value={value} onChange={handleChange} />;
};

export const Controlled: IStory = {
  render: (props) => <ControlledSuggestDemo {...props} />,
  args: defaultArgs,
};

export const ControlledWithEmptyItem: IStory = {
  render: (props) => <ControlledSuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    items: [emptyItem, ...fruits],
  },
};

export const ControlledAndClearable: IStory = {
  render: (props) => <ControlledSuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: fruits[1].value,
    clearable: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <ControlledSuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export const Grid: IStory = {
  render: (props) => <SuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
  },
};

const AsyncControlledSuggestDemo: React.FC<ISuggestProps> = (props) => {
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
    <SuggestDemo
      {...props}
      onQueryChange={handleQueryChange}
      items={items}
      loading={isLoading}
    />
  );
};

export const AsyncGrid: IStory = {
  render: (props) => <AsyncControlledSuggestDemo {...props} />,
  args: {
    ...defaultArgs,
    cols: 3,
    itemFocus: 'icon',
    items: [],
  },
};

export default meta;
