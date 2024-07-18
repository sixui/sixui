import type { Meta, StoryObj } from '@storybook/react';

import type { IColorRolesProps } from './ColorRoles.types';
import { ColorRoles } from './ColorRoles';

// https://m3.material.io/styles/color/roles
// https://material-web.dev/theming/color/

const meta = {
  component: ColorRoles,
} satisfies Meta<typeof ColorRoles>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorRolesProps>;

export const BaselineColors: IStory = {
  render: (props) => <ColorRoles {...props} />,
  args: defaultArgs,
};

export default meta;
