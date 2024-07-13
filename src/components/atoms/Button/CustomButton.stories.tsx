import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IButtonProps } from './ButtonProps';
import { componentVars as buttonVars } from '@/themes/base/Button/Button.stylex';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  squared: {
    [buttonVars.containerShape]: '0',
  },
});

const defaultArgs = {
  children: 'Button',
} satisfies Partial<IButtonProps>;

export const Basic: IStory = {
  render: (props) => <Button {...props} />,
  args: {
    ...defaultArgs,
    sx: styles.squared,
  },
};

export default meta;
