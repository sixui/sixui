import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IDensityProps } from './Density.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { IListItemProps, ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Density } from './Density';
import { List } from '../List';

const meta = {
  component: Density,
} satisfies Meta<typeof Density>;

type IStory = StoryObj<typeof meta>;

const renderListItems = (props?: IListItemProps, count = 4): React.ReactNode =>
  createSequence(count, 1).map((initials, index) => (
    <ListItem key={index} leading={<Avatar>{initials}</Avatar>} {...props}>
      Headline
    </ListItem>
  ));

const defaultArgs = {
  children: <List>{renderListItems()}</List>,
} satisfies Partial<IDensityProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <Density {...props} />}
      verticalAlign='start'
      cols={[
        {
          legend: 'Normal (0)',
          props: {
            density: 0,
          },
        },
        {
          legend: 'Low (-4)',
          props: {
            density: -4,
          },
        },
      ]}
      props={props}
    />
  ),
  args: defaultArgs as IDensityProps,
};

export default meta;
