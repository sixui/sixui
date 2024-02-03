import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';

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
      colsProps={[
        { level: 0 },
        { level: 1 },
        { level: 2 },
        { level: 3 },
        { level: 4 },
        { level: 5 },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
