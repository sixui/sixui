import type { Meta, StoryObj } from '@storybook/react';

import type { IPlaceholderProps } from './Placeholder.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from './Placeholder';

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  width: '$24',
  height: '$24',
} satisfies Partial<IPlaceholderProps>;

const PlaceholderShowcase = makeComponentShowcase(Placeholder);

export const Basic: IStory = {
  render: (props) => (
    <PlaceholderShowcase
      props={props}
      cols={[{}, { props: { corner: '$lg' } }, { props: { corner: '$full' } }]}
      rows={[
        { legend: 'Normal' },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'Label',
    crosshairs: true,
  },
};

export default meta;
