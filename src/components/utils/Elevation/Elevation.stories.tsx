import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Placeholder } from '@/components/atoms/Placeholder';
import { Elevation, type IElevationProps } from './Elevation';

const meta = {
  component: Elevation,
} satisfies Meta<typeof Elevation>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IElevationProps>;

const placeholderStyles = stylex.create({
  host: {
    width: '6rem',
    height: '6rem',
  },
});

export const Levels: IStory = {
  render: (props) => (
    <ComponentShowcase<IElevationProps>
      component={(variantArgs) => (
        <Placeholder
          styles={placeholderStyles}
          label={`Level ${variantArgs.level}`}
        >
          <Elevation {...props} {...variantArgs} />
        </Placeholder>
      )}
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
