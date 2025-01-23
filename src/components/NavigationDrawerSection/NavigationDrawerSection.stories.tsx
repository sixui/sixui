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
      <NavigationDrawerSection.Destination
        leadingIcon={<FontAwesomeIcon icon={faInbox} />}
        badgeLabel="24"
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        active
      >
        Inbox
      </NavigationDrawerSection.Destination>
      <NavigationDrawerSection.Destination
        leadingIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
      >
        Outbox
      </NavigationDrawerSection.Destination>
      <NavigationDrawerSection.Destination
        leadingIcon={<FontAwesomeIcon icon={faHeart} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        disabled
      >
        Favorites
      </NavigationDrawerSection.Destination>
      <NavigationDrawerSection.Destination
        leadingIcon={<FontAwesomeIcon icon={faTrash} />}
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
      >
        Trash
      </NavigationDrawerSection.Destination>
    </NavigationDrawerSection>

    <NavigationDrawerSection headline="Labels" {...props}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => (
        <NavigationDrawerSection.Destination
          key={index}
          leadingIcon={<FontAwesomeIcon icon={faFolder} />}
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          supportingText="Supporting text"
        >
          Label {label}
        </NavigationDrawerSection.Destination>
      ))}
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
