import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type {
  INavigationDrawerContentProps,
  INavigationDrawerContentVariant,
} from './NavigationDrawerContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { NavigationDrawerContent } from './NavigationDrawerContent';

const meta = {
  component: NavigationDrawerContent,
} satisfies Meta<typeof NavigationDrawerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<INavigationDrawerContentProps>;

const NavigationDrawerContentShowcase = componentShowcaseFactory(
  NavigationDrawerContent,
);

export const Variants: IStory = {
  render: (props) => (
    <NavigationDrawerContentShowcase
      props={props}
      cols={(
        [
          'standard',
          'modal',
          'detachedModal',
        ] as Array<INavigationDrawerContentVariant>
      ).map((variant) => ({
        props: {
          variant,
        },
        legend: capitalizeFirstLetter(variant),
      }))}
      fullWidth
    />
  ),
  args: {
    ...defaultArgs,
    divider: true,
    w: '$72',
    h: '$96',
    headline: 'Headline',
    onClose: (args) => void sbHandleEvent('onClose', args),
    showCloseButton: true,
    header: <Placeholder expanded label="Header" />,
    children: <Placeholder expanded label="Children" />,
    footer: <Placeholder expanded label="Footer" />,
  },
};

export default meta;
