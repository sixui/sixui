import type { Meta, StoryObj } from '@storybook/react';

import type { IPlaceholderProps } from './Placeholder.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from './Placeholder';

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '96px',
  h: '96px',
} satisfies Partial<IPlaceholderProps>;

const PlaceholderShowcase = componentShowcaseFactory(Placeholder);

export const Basic: IStory = {
  render: (props) => (
    <PlaceholderShowcase
      props={props}
      cols={[{}, { props: { shape: '$lg' } }, { props: { shape: '$full' } }]}
      rows={[
        { legend: 'Normal' },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'Label',
    diagonals: true,
  },
};

export default meta;
