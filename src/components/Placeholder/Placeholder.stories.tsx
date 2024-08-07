import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IPlaceholderProps } from './Placeholder.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from './Placeholder';

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 96,
    height: 96,
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IPlaceholderProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
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
