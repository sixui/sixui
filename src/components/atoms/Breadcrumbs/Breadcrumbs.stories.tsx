import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { createSequence } from '@olivierpascal/helpers';

import type { IBreadcrumbsProps } from './BreadcrumbsProps';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IBreadcrumbsProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Breadcrumbs}
      horizontalAlign='start'
      rows={[
        {
          legend: 'Default',
        },
        {
          legend: 'Trailing Separator',
          props: { showTrailingSeparator: true },
        },
        {
          legend: 'Custom Separator',
          props: {
            separator: <FontAwesomeIcon icon={faChevronRight} size='2xs' />,
          },
        },
        {
          legend: 'Collapsed',
          props: {
            maxItems: 2,
            children: createSequence(5).map((index) => (
              <span key={index}>Item {index + 1}</span>
            )),
          },
        },
      ]}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    children: createSequence(3).map((index) => (
      <span key={index}>Item {index + 1}</span>
    )),
  },
};

export default meta;
