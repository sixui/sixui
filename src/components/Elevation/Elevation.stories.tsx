import type { Meta, StoryObj } from '@storybook/react';

import type { IElevationProps } from './Elevation.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { Elevation } from './Elevation';

const meta = {
  component: Elevation,
} satisfies Meta<IElevationProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IElevationProps>;

const ElevationShowcase = makeComponentShowcase((props: IElevationProps) => (
  <Placeholder
    width='$24'
    height='$24'
    corner='$md'
    label={`Level ${props.level}`}
  >
    <Elevation {...props} />
  </Placeholder>
));

export const Levels: IStory = {
  render: (props) => (
    <ElevationShowcase
      props={props}
      cols={[
        { props: { level: 0 } },
        { props: { level: 1 } },
        { props: { level: 2 } },
        { props: { level: 3 } },
        { props: { level: 4 } },
        { props: { level: 5 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
