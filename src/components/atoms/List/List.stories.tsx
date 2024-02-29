import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import stylex from '@stylexjs/stylex';
import { LinkIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { List, type IListProps } from './List';
import { ListItem } from '../ListItem';
import { SvgIcon } from '../SvgIcon';

// https://m3.material.io/components/lists/overview
// https://material-web.dev/components/list/
// https://material-web.dev/components/list/stories/
// https://github.com/material-components/material-web/blob/main/list/demo/stories.ts

const meta = {
  component: List,
} satisfies Meta<typeof List>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IListProps>;

const listStyles = stylex.create({
  host: {
    borderRadius: '8px',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: colorRolesVars.outline,
    maxWidth: '360px',
    overflow: 'hidden',
    width: '100%',
  },
});

export const NonInteractive: IStory = {
  render: (args) => (
    <ComponentShowcase
      component={(args) => (
        <List {...args}>
          <ListItem end={<SvgIcon icon={LinkIcon} />}>
            Single line item
          </ListItem>
          <ListItem
            supportingText='Supporting text'
            trailingSupportingText='1/2'
          >
            Two line item
          </ListItem>
          <ListItem overline='Overline' supportingText='Supporting text'>
            Three line item
          </ListItem>
          <ListItem start={<SvgIcon icon={CalendarDaysIcon} />} disabled>
            Disabled item
          </ListItem>
        </List>
      )}
      props={args}
    />
  ),
  args: {
    ...defaultArgs,
    styles: listStyles,
  },
};

export const Interactive: IStory = {
  render: (args) => (
    <ComponentShowcase
      component={(args) => (
        <List {...args}>
          <ListItem
            type='link'
            href='https://google.com'
            target='_blank'
            end={<SvgIcon icon={LinkIcon} />}
          >
            Link item
          </ListItem>
          <ListItem
            type='button'
            trailingSupportingText='1/2'
            supportingText='Supporting text'
          >
            Button item
          </ListItem>
          <ListItem overline='Overline' supportingText='Supporting text'>
            Non-interactive item
          </ListItem>
          <ListItem start={<SvgIcon icon={CalendarDaysIcon} />} disabled>
            Disabled item
          </ListItem>
        </List>
      )}
      props={args}
    />
  ),
  args: {
    ...defaultArgs,
    styles: listStyles,
  },
};

export default meta;
