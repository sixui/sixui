import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import type { IStackProps } from './Stack.types';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
import { ComponentShowcase } from '../ComponentShowcase';
import { Stack } from './Stack';
import { stackStyles as styles } from './Stack.stories.css';

const meta = {
  component: Stack,
} satisfies Meta<typeof Stack>;

type IStory = StoryObj<typeof meta>;

const PlaceholderDemo: React.FC<IPlaceholderProps> = ({ sx, ...other }) => (
  // <Placeholder className={clsx([styles.placeholder, sx]} {...other} />
  <div>YY</div>
);

const defaultArgs = {
  children: [
    <PlaceholderDemo key={0} sx={styles.placeholder$sm} label='Item 1' />,
    <PlaceholderDemo key={1} sx={styles.placeholder$md} label='Item 2' />,
    <PlaceholderDemo key={2} sx={styles.placeholder$lg} label='Item 3' />,
  ],
  sx: styles.root,
  horizontal: true,
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
      rows={[
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
      rows={[
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
