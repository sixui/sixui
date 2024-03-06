import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from './ComponentShowcase';
import { type IDemoComponentProps, DemoComponent } from './DemoComponent';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const meta = {
  component: DemoComponent,
} satisfies Meta<typeof DemoComponent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  color: colorRolesVars.primary,
} satisfies Partial<IDemoComponentProps>;

export const One: IStory = {
  render: (props) => (
    <ComponentShowcase component={DemoComponent} props={props} />
  ),
  args: defaultArgs,
};

export const OneRow: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      colsProps={[
        { color: colorRolesVars.primary },
        { color: colorRolesVars.secondary },
        { color: colorRolesVars.tertiary },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneRowWithLegend: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      colsProps={[
        { $legend: 'Primary', color: colorRolesVars.primary },
        { $legend: 'Secondary', color: colorRolesVars.secondary },
        { $legend: 'Tertiary', color: colorRolesVars.tertiary },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneCol: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      rowsProps={[{ size: 'sm' }, {}, { size: 'lg' }]}
    />
  ),
  args: defaultArgs,
};

export const OneColWithLegend: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      rowsProps={[
        { $legend: 'Small', size: 'sm' },
        { $legend: 'Medium', size: 'md' },
        { $legend: 'Big', size: 'lg' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const RowsAndCols: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      colsProps={[
        { $legend: 'Primary', color: colorRolesVars.primary },
        { $legend: 'Secondary', color: colorRolesVars.secondary },
        { $legend: 'Tertiary', color: colorRolesVars.tertiary },
      ]}
      rowsProps={[
        { $legend: 'Small', size: 'sm' },
        { $legend: 'Medium', size: 'md' },
        { $legend: 'Big', size: 'lg' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Groups: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      colsProps={[
        { $legend: 'Primary', color: colorRolesVars.primary },
        { $legend: 'Secondary', color: colorRolesVars.secondary },
        { $legend: 'Tertiary', color: colorRolesVars.tertiary },
      ]}
      rowsProps={[
        { $legend: 'Small', size: 'sm' },
        { $legend: 'Medium', size: 'md' },
        { $legend: 'Big', size: 'lg' },
      ]}
      groupsProps={[
        { $legend: 'Shirts', icon: 'shirt' },
        { $legend: 'Socks', icon: 'socks' },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
