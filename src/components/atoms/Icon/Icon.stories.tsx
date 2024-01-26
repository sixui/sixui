import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  XMarkIcon,
  PlusIcon,
  CalendarDaysIcon,
  PhotoIcon,
  Cog6ToothIcon,
  LinkIcon,
} from '@heroicons/react/20/solid';

import { ComponentShowcase } from '@/components/molecules/ComponentShowcase';
import { Icon, type IIconProps } from './Icon';

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IIconProps>;

export const Standard: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Icon}
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
