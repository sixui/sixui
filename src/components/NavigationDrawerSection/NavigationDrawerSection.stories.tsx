import type { Meta, StoryObj } from '@storybook/react';
import {
  faFolder,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faInbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { INavigationDrawerSectionProps } from './NavigationDrawerSection.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { Paper } from '../Paper';
import { NavigationDrawerSection } from './NavigationDrawerSection';

const meta = {
  component: NavigationDrawerSection,
} satisfies Meta<typeof NavigationDrawerSection>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<INavigationDrawerSectionProps>;

const NavigationDrawerSectionDemo: React.FC<INavigationDrawerSectionProps> = (
  props,
) => (
  <Paper
    as={Flex}
    direction="column"
    gap="$4"
    surface="$surface"
    outline="$xs"
    outlineStyle="dashed"
    pt="$8"
    pb="$8"
    w="$96"
  >
    <NavigationDrawerSection headline="Mail" endDivider {...props}>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faInbox} />}
        badgeLabel="24"
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        active
      >
        Inbox
      </NavigationDrawerDestination>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
      >
        Outbox
      </NavigationDrawerDestination>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faHeart} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        disabled
      >
        Favorites
      </NavigationDrawerDestination>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faTrash} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
      >
        Trash
      </NavigationDrawerDestination>
    </NavigationDrawerSection>

    <NavigationDrawerSection headline="Labels" {...props}>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faFolder} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        supportingText="Supporting text"
      >
        Label
      </NavigationDrawerDestination>
      <NavigationDrawerDestination
        variant="navigation"
        leadingIcon={<FontAwesomeIcon icon={faFolder} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
      >
        Label
      </NavigationDrawerDestination>
    </NavigationDrawerSection>
  </Paper>
);

const NavigationDrawerSectionDemoShowcase = componentShowcaseFactory(
  NavigationDrawerSectionDemo,
);

export const Basic: IStory = {
  render: (props) => <NavigationDrawerSectionDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
