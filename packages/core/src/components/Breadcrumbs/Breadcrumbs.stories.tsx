import type { Meta, StoryObj } from '@storybook/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type IStory = StoryObj<typeof meta>;

const BreadcrumbsShowcase = componentShowcaseFactory(Breadcrumbs);

export const Variants: IStory = {
  render: (props) => (
    <BreadcrumbsShowcase
      horizontalAlign="start"
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
            separator: <FontAwesomeIcon icon={faChevronRight} size="2xs" />,
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
    children: createSequence(3).map((index) => (
      <Button key={index} variant="inline">
        Item {index + 1}
      </Button>
    )),
  },
};

export default meta;
