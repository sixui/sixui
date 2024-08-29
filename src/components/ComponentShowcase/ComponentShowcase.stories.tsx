import type { Meta, StoryObj } from '@storybook/react';

import { makeComponentShowcase } from './ComponentShowcase';
import { DemoComponent, type IDemoComponentProps } from './DemoComponent';
import { themeTokens } from '../ThemeProvider';

const meta = {
  component: DemoComponent,
} satisfies Meta<typeof DemoComponent>;

type IStory = StoryObj<typeof meta>;

const DemoShowcase = makeComponentShowcase(DemoComponent);

const defaultArgs = {
  color: themeTokens.colorScheme.primary,
} satisfies Partial<IDemoComponentProps>;

export const One: IStory = {
  render: (props) => <DemoShowcase props={props} />,
  args: defaultArgs,
};

export const OneRow: IStory = {
  render: (props) => (
    <DemoShowcase
      component={DemoComponent}
      props={props}
      cols={[
        { props: { color: themeTokens.colorScheme.primary } },
        { props: { color: themeTokens.colorScheme.secondary } },
        { props: { color: themeTokens.colorScheme.tertiary } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneRowWithLegend: IStory = {
  render: (props) => (
    <DemoShowcase
      component={DemoComponent}
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { color: themeTokens.colorScheme.primary },
        },
        {
          legend: 'Secondary',
          props: { color: themeTokens.colorScheme.secondary },
        },
        {
          legend: 'Tertiary',
          props: { color: themeTokens.colorScheme.tertiary },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneCol: IStory = {
  render: (props) => (
    <DemoShowcase
      component={DemoComponent}
      props={props}
      rows={[{ props: { size: 'sm' } }, {}, { props: { size: 'lg' } }]}
    />
  ),
  args: defaultArgs,
};

export const OneColWithLegend: IStory = {
  render: (props) => (
    <DemoShowcase
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
    <DemoShowcase
      component={DemoComponent}
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { color: themeTokens.colorScheme.primary },
        },
        {
          legend: 'Secondary',
          props: { color: themeTokens.colorScheme.secondary },
        },
        {
          legend: 'Tertiary',
          props: { color: themeTokens.colorScheme.tertiary },
        },
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
    <DemoShowcase
      component={DemoComponent}
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { color: themeTokens.colorScheme.primary },
        },
        {
          legend: 'Secondary',
          props: { color: themeTokens.colorScheme.secondary },
        },
        {
          legend: 'Tertiary',
          props: { color: themeTokens.colorScheme.tertiary },
        },
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
