import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from './ComponentShowcase';
import { type IDemoComponentProps, DemoComponent } from './DemoComponent';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';

const meta = {
  component: DemoComponent,
} satisfies Meta<typeof DemoComponent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  color: colorSchemeTokens.primary,
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
      cols={[
        { props: { color: colorSchemeTokens.primary } },
        { props: { color: colorSchemeTokens.secondary } },
        { props: { color: colorSchemeTokens.tertiary } },
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
      cols={[
        { legend: 'Primary', props: { color: colorSchemeTokens.primary } },
        { legend: 'Secondary', props: { color: colorSchemeTokens.secondary } },
        { legend: 'Tertiary', props: { color: colorSchemeTokens.tertiary } },
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
      rows={[{ props: { size: 'sm' } }, {}, { props: { size: 'lg' } }]}
    />
  ),
  args: defaultArgs,
};

export const OneColWithLegend: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DemoComponent}
      props={props}
      rows={[
        { legend: 'Small', props: { size: 'sm' } },
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Big', props: { size: 'lg' } },
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
      cols={[
        { legend: 'Primary', props: { color: colorSchemeTokens.primary } },
        { legend: 'Secondary', props: { color: colorSchemeTokens.secondary } },
        { legend: 'Tertiary', props: { color: colorSchemeTokens.tertiary } },
      ]}
      rows={[
        { legend: 'Small', props: { size: 'sm' } },
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Big', props: { size: 'lg' } },
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
      cols={[
        { legend: 'Primary', props: { color: colorSchemeTokens.primary } },
        { legend: 'Secondary', props: { color: colorSchemeTokens.secondary } },
        { legend: 'Tertiary', props: { color: colorSchemeTokens.tertiary } },
      ]}
      rows={[
        { legend: 'Small', props: { size: 'sm' } },
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Big', props: { size: 'lg' } },
      ]}
      groups={[
        { legend: 'Shirts', props: { icon: 'shirt' } },
        { legend: 'Socks', props: { icon: 'socks' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
