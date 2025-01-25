import type { Meta, StoryObj } from '@storybook/react';

import type { IElevationProps } from './Elevation.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { Elevation } from './Elevation';

const meta = {
  component: Elevation,
} satisfies Meta<IElevationProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IElevationProps>;

const ElevationShowcase = componentShowcaseFactory((props: IElevationProps) => (
  <Placeholder w="$24" h="$24" shape="$md" label={`Level ${props.level}`}>
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
