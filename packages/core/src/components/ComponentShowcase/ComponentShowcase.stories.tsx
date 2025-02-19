import type { Meta, StoryObj } from '@storybook/react';

import type { IDemoComponentProps } from './ComponentShowcase.stories/DemoComponent';
import { componentShowcaseFactory } from './ComponentShowcase';
import { DemoComponent } from './ComponentShowcase.stories/DemoComponent';

const meta = {
  component: DemoComponent,
} satisfies Meta<typeof DemoComponent>;

type IStory = StoryObj<IDemoComponentProps>;

const DemoShowcase = componentShowcaseFactory(DemoComponent);

const defaultArgs = {
  c: '$primary',
} satisfies Partial<IDemoComponentProps>;

export const One: IStory = {
  render: (props) => <DemoShowcase props={props} />,
  args: defaultArgs,
};

export const OneRow: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      cols={[
        { props: { c: '$primary' } },
        { props: { c: '$secondary' } },
        { props: { c: '$tertiary' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneRowWithLegend: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { c: '$primary' },
        },
        {
          legend: 'Secondary',
          props: { c: '$secondary' },
        },
        {
          legend: 'Tertiary',
          props: { c: '$tertiary' },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const OneCol: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      rows={[{ props: { scale: 'sm' } }, {}, { props: { scale: 'lg' } }]}
    />
  ),
  args: defaultArgs,
};

export const OneColWithLegend: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      rows={[
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Big', props: { scale: 'lg' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const RowsAndCols: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { c: '$primary' },
        },
        {
          legend: 'Secondary',
          props: { c: '$secondary' },
        },
        {
          legend: 'Tertiary',
          props: { c: '$tertiary' },
        },
      ]}
      rows={[
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Big', props: { scale: 'lg' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Groups: IStory = {
  render: (props) => (
    <DemoShowcase
      props={props}
      cols={[
        {
          legend: 'Primary',
          props: { c: '$primary' },
        },
        {
          legend: 'Secondary',
          props: { c: '$secondary' },
        },
        {
          legend: 'Tertiary',
          props: { c: '$tertiary' },
        },
      ]}
      rows={[
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Big', props: { scale: 'lg' } },
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
