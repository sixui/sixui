import type { Meta, StoryObj } from '@storybook/react';

import type { IPlaceholderProps } from './Placeholder.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from './Placeholder';
import { textStoriesStyles } from './Placeholder.stories.css';

const { classNames } = textStoriesStyles;

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  className: classNames.container,
} satisfies Partial<IPlaceholderProps>;

const PlaceholderShowcase = makeComponentShowcase(Placeholder);

export const Basic: IStory = {
  render: (props) => (
    <PlaceholderShowcase
      props={props}
      cols={[{}, { props: { corner: 'md' } }, { props: { corner: 'full' } }]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'Label',
    crosshairs: true,
  },
};

export default meta;
