import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IStackProps } from './Stack.types';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
import { ComponentShowcase } from '../ComponentShowcase';
import { stackStyles as styles } from './Stack.stories.css';
import { Stack } from './Stack';

const meta = {
  component: Stack,
} satisfies Meta<typeof Stack>;

type IStory = StoryObj<typeof meta>;

const BasePlaceholder: React.FC<IPlaceholderProps> = ({ sx, ...other }) => (
  // <Placeholder sx={[stackStyles.placeholder, sx]} {...other} />
  <div>XX</div>
);

const defaultArgs = {
  children: [
    <BasePlaceholder key={0} sx={styles.placeholder$sm} label='Item 1' />,
    <BasePlaceholder key={1} sx={styles.placeholder$md} label='Item 2' />,
    <BasePlaceholder key={2} sx={styles.placeholder$lg} label='Item 3' />,
  ],
  sx: styles.host,
  gap: 4,
} satisfies Partial<IStackProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <Stack {...props} />}
      props={props}
    />
  ),
  args: defaultArgs,
};

export const Align: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <Stack {...props} />}
      props={props}
      cols={[
        {
          legend: 'Start',
          props: {
            align: 'start',
          },
        },
        {
          legend: 'Center',
          props: {
            align: 'center',
          },
        },
        {
          legend: 'End',
          props: {
            align: 'end',
          },
        },
        {
          legend: 'Stretch',
          props: {
            align: 'stretch',
          },
        },
        {
          legend: 'Baseline',
          props: {
            align: 'baseline',
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Justify: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <Stack {...props} />}
      props={props}
      cols={[
        {
          legend: 'Start',
          props: {
            justify: 'start',
          },
        },
        {
          legend: 'Center',
          props: {
            justify: 'center',
          },
        },
        {
          legend: 'End',
          props: {
            justify: 'end',
          },
        },
        {
          legend: 'Space Between',
          props: {
            justify: 'space-between',
          },
        },
        {
          legend: 'Space Around',
          props: {
            justify: 'space-around',
          },
        },
        {
          legend: 'Space Evenly',
          props: {
            justify: 'space-evenly',
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
