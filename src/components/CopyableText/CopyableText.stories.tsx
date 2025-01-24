import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICopyableTextProps } from './CopyableText.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { CopyableText } from './CopyableText';

const meta = {
  component: CopyableText,
} satisfies Meta<typeof CopyableText>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICopyableTextProps>;

const COPYABLE_TEXT = '+1 (323) 462-1831';

const rows: Array<IComponentPresentation<ICopyableTextProps>> = [
  {
    legend: 'Text copy',
    component: (props) => <CopyableText {...props} />,
    props: {
      text: COPYABLE_TEXT,
    },
  },
  {
    legend: 'Children copy',
    component: (props) => (
      <Text>
        You can reach me on <CopyableText {...props} />, or by email.
      </Text>
    ),
    props: {
      children: COPYABLE_TEXT,
    },
  },
  {
    legend: 'Disabled',
    component: (props) => (
      <Text>
        You can reach me on <CopyableText {...props} />, or by email.
      </Text>
    ),
    props: {
      children: COPYABLE_TEXT,
      disabled: true,
    },
  },
];

const CopyableTextShowcase = componentShowcaseFactory(CopyableText);

export const Configurations: IStory = {
  render: (props) => (
    <CopyableTextShowcase props={props} horizontalAlign="start" rows={rows} />
  ),
  args: defaultArgs,
};

export default meta;
