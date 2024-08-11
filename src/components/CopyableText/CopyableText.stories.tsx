import type { Meta, StoryObj } from '@storybook/react';

import type { ICopyableTextProps } from './CopyableText.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Text } from '../Text';
import { CopyableText } from './CopyableText';

const meta = {
  component: CopyableText,
} satisfies Meta<typeof CopyableText>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICopyableTextProps>;

const COPYABLE_TEXT = '+1 (323) 462-1831';

const rows: Array<IComponentPresentation<ICopyableTextProps>> = [
  {
    legend: 'Icon only',
    component: (props) => <CopyableText {...props} />,
    props: {
      text: COPYABLE_TEXT,
    },
  },
  {
    legend: 'Icon and text',
    component: (props) => (
      <Text>
        You can reach me on <CopyableText {...props} />, or by email.
      </Text>
    ),
    props: {
      children: COPYABLE_TEXT,
    },
  },
];

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={CopyableText}
      horizontalAlign='start'
      props={props}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export default meta;
