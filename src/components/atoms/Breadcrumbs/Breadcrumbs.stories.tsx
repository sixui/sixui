import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Breadcrumbs, type IBreadcrumbsProps } from './Breadcrumbs';

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IBreadcrumbsProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Breadcrumbs {...props} aria-label='breadcrumb'>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Breadcrumbs>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    children: undefined,
  },
};

export const WithTrailingSeparator: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Breadcrumbs {...props} aria-label='breadcrumb'>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Breadcrumbs>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    children: undefined,
    trailing: true,
  },
};

export const WithCustomSeparator: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Breadcrumbs {...props} aria-label='breadcrumb' separator='›'>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Breadcrumbs>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    children: undefined,
  },
};

export const Collapsed: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Breadcrumbs {...props} aria-label='breadcrumb' maxItems={2}>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
          <span>Item 4</span>
          <span>Item 5</span>
        </Breadcrumbs>
      )}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    children: undefined,
  },
};

export default meta;
