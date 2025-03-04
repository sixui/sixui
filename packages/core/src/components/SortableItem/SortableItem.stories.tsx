import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IOmit, ISide } from '~/utils/types';
import type { ISortableItemProps } from './SortableItem.types';
import { Card } from '~/components/Card';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { px } from '~/utils/css';
import { themeTokens } from '~/components/Theme/theme.css';
import { SortableItem } from './SortableItem';

const meta = {
  component: SortableItem,
} satisfies Meta<typeof SortableItem>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  id: 'ID',
  w: '64px',
  h: '96px',
} satisfies Partial<ISortableItemProps>;

type ISortableItemDemoProps = IOmit<ISortableItemProps, 'children'>;

const SortableItemDemo: React.FC<ISortableItemDemoProps> = (props) => (
  <SortableItem as={Card} shape="$xs" {...props}>
    <Flex align="center" justify="center" h="100%" />
  </SortableItem>
);

const SortableItemDemoShowcase = componentShowcaseFactory(SortableItemDemo);

export const Basic: IStory = {
  render: (props) => <SortableItemDemoShowcase props={props} />,
  args: defaultArgs,
};

export const WithDragHandle: IStory = {
  render: (props) => (
    <SortableItemDemoShowcase
      props={props}
      cols={(['top', 'right', 'bottom', 'left'] as Array<ISide>).map(
        (dragHandlePosition) => ({
          legend: capitalizeFirstLetter(dragHandlePosition),
          props: {
            dragHandlePosition,
          },
        }),
      )}
    />
  ),
  args: {
    ...defaultArgs,
    dragHandle: true,
  },
};

export const WithCustomDragHandle: IStory = {
  render: (props) => <SortableItemDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    dragHandle: true,
    dragHandleRenderer: ({ getProps }) => (
      <div
        {...getProps()}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: px(8),
          backgroundColor: themeTokens.colorScheme.primary,
          borderRadius: themeTokens.shape.corner.full,
          width: px(12),
          height: px(12),
          cursor: 'grab',
        }}
      />
    ),
  },
};

export default meta;
