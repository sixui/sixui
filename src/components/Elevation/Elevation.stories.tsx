import type { Meta, StoryObj } from '@storybook/react';

import type { IElevationProps } from './Elevation.types';
import { makeComponentShowcase } from '../ComponentShowcase';
// import { Placeholder } from '../Placeholder';
import { Elevation } from './Elevation';

const meta = {
  component: Elevation,
} satisfies Meta<typeof Elevation>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IElevationProps>;

const ElevationShowcase = makeComponentShowcase((props: IElevationProps) => (
  // FIXME: use Placeholder
  <div
    style={{
      position: 'relative',
      width: 96,
      height: 96,
      border: '1px solid gray',
    }}
    // width={96}
    // height={96}
    // label={`Level ${variantArgs.level}`}
  >
    <Elevation {...props} />
    {`Level ${props.level}`}
  </div>
));

export const Levels: IStory = {
  render: (props) => (
    <ElevationShowcase
      props={{}}
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
