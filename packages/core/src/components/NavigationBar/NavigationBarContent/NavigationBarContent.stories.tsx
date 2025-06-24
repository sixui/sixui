import type { Meta, StoryObj } from '@storybook/react-vite';
import { createSequence } from '@olivierpascal/helpers';

import type { INavigationBarContentProps } from './NavigationBarContent.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { NavigationBarContent } from './NavigationBarContent';

const meta = {
  component: NavigationBarContent,
} satisfies Meta<typeof NavigationBarContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  outline: '$xs',
  outlineStyle: 'dashed',
  w: '384px',
  children: createSequence(4).map((index) => (
    <Placeholder key={index} w="56px" h="52px" diagonals />
  )),
} satisfies Partial<INavigationBarContentProps>;

const NavigationBarContentShowcase =
  componentShowcaseFactory(NavigationBarContent);

export const Basic: IStory = {
  render: (props) => <NavigationBarContentShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
