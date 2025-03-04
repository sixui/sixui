import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { ISimpleGridProps } from './SimpleGrid.types';
import { Placeholder } from '~/components/Placeholder';
import { px } from '~/utils/css';
import { themeTokens } from '~/components/Theme/theme.css';
import { SimpleGrid } from './SimpleGrid';

const meta = {
  component: SimpleGrid,
} satisfies Meta<typeof SimpleGrid>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  bd: `1px solid ${themeTokens.colorScheme.outlineVariant}`,
  br: px(themeTokens.shape.corner.sm),
  p: '$lg',
  w: 'max-content',
} satisfies Partial<ISimpleGridProps>;

export const Basic: IStory = {
  render: (props) => <SimpleGrid {...props} />,
  args: {
    ...defaultArgs,
    cols: {
      compact: 1,
      medium: 2,
      expanded: 3,
      large: 4,
      extraLarge: 5,
    },
    children: createSequence(5).map((index) => (
      <Placeholder
        key={index}
        label={index + 1}
        h="96px"
        w="64px"
        shape="$sm"
        expanded
      />
    )),
  },
};

export default meta;
