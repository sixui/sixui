import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { type IListProps, List } from './List';

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
    width: '250px',
  },
});

export const NonInteractive: IStory = {
  render: (args) => (
    <ComponentShowcase
      component={(args) => (
        <List {...args}>
          <List.Item trailingIcon={<FontAwesomeIcon icon={faLink} />}>
            Single line item
          </List.Item>
          <List.Item overline='Overline' trailingSupportingText='1/2'>
            Two line item
          </List.Item>
          <List.Item supportingText='Supporting text'>
            Three line item
          </List.Item>
          <List.Divider />
          <List.Item
            leadingIcon={<FontAwesomeIcon icon={faCalendarDays} />}
            disabled
          >
            Disabled item
          </List.Item>
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
          <List.Item
            href='https://google.com'
            target='_blank'
            trailingIcon={<FontAwesomeIcon icon={faLink} />}
          >
            Link item
          </List.Item>
          <List.Item
            onClick={(...args) => sbHandleEvent('click', args)}
            trailingSupportingText='1/2'
            overline='Overline'
          >
            Button item
          </List.Item>
          <List.Item supportingText='Supporting text'>
            Non-interactive item
          </List.Item>
          <List.Item
            leadingIcon={<FontAwesomeIcon icon={faCalendarDays} />}
            disabled
          >
            Disabled item
          </List.Item>
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
