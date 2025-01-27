import type { Meta, StoryObj } from '@storybook/react';

import type { IDiagonalsProps } from './Diagonals.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Paper } from '~/components/Paper';
import { Diagonals } from './Diagonals';

const meta = {
  component: Diagonals,
} satisfies Meta<typeof Diagonals>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDiagonalsProps>;

const DiagonalsDemo: React.FC<IDiagonalsProps> = (props) => (
  <Paper w="$48" h="$24" outline="$xs" shape="$md">
    <Diagonals {...props} />
  </Paper>
);

const DiagonalsDemoShowcase = componentShowcaseFactory(DiagonalsDemo);

export const Basic: IStory = {
  render: (props) => <DiagonalsDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
