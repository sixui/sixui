import type { Meta, StoryObj } from '@storybook/react';

import { makeComponentShowcase } from './ComponentShowcase';
import { DemoComponent, type IDemoComponentProps } from './DemoComponent';

const meta = {
  component: DemoComponent,
} satisfies Meta<typeof DemoComponent>;

type IStory = StoryObj<IDemoComponentProps>;

const DemoShowcase = makeComponentShowcase(DemoComponent);

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
      rows={[{ props: { size: 'sm' } }, {}, { props: { size: 'lg' } }]}
    />
  ),
  args: defaultArgs,
};

export const OneColWithLegend: IStory = {
  render: (props) => (
    <DemoShowcase
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
