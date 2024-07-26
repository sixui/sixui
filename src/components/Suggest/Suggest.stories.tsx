import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { ISuggestProps } from './Suggest.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ListItem } from '~/components/ListItem';
import { fruits, emptyItem } from '~/components/FilterableList/fruits';
import { commonStyles } from '~/helpers/commonStyles';
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
    <div {...stylex.props(commonStyles.verticalLayout)}>
      <Suggest {...props} onChange={handleChange} />
      <div>
        Value:{' '}
        {value === undefined ? <em>undefined</em> : JSON.stringify(value)}
      </div>
    </div>
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
  const [value, setValue] = useState<string>(props.defaultValue ?? '');

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

export default meta;
