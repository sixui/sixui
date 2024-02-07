import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import React from 'react';
import {
  XMarkIcon,
  PlusIcon,
  CalendarDaysIcon,
  PhotoIcon,
  Cog6ToothIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { Icon, type IIconProps } from './Icon';

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IIconProps>;

const styles = stylex.create({
  host: {
    color: colorRolesVars.onSurface,
  },
});

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <div {...stylex.props(styles.host)}>
          <Icon {...props} />
        </div>
      )}
      props={props}
      colsProps={[
        { icon: PlusIcon },
        { icon: CalendarDaysIcon },
        { icon: PhotoIcon },
        { icon: Cog6ToothIcon },
        { icon: LinkIcon },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: XMarkIcon,
  },
};

export default meta;
