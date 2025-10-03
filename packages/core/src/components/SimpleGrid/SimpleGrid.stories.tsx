import type { Meta, StoryObj } from '@storybook/react-vite';
import { createSequence } from '@olivierpascal/helpers';

import type { ISimpleGridProps } from './SimpleGrid.types';
import { Placeholder } from '~/components/Placeholder';
import { px } from '~/utils/css';
import { themeTokens } from '~/components/Theme/theme.css';
import { Resizable } from '../Resizable';
import { SimpleGrid } from './SimpleGrid';

const meta = {
  component: SimpleGrid,
} satisfies Meta<typeof SimpleGrid>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  bd: `1px solid ${themeTokens.colorScheme.outlineVariant}`,
  br: px(themeTokens.shape.corner.sm),
  p: '$lg',
} satisfies Partial<ISimpleGridProps>;

export const WithMediaQueries: IStory = {
  render: (props) => <SimpleGrid {...props} />,
  args: {
    ...defaultArgs,
    w: 'max-content',
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

export const WithContainerQueries: IStory = {
  render: (props) => (
    <Resizable
      minWidth={100}
      maxWidth={1200}
      defaultWidth={800}
      orientation="horizontal"
    >
      <SimpleGrid {...props} />
    </Resizable>
  ),
  args: {
    ...defaultArgs,
    type: 'container',
    w: '100%',
    h: '100%',
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
