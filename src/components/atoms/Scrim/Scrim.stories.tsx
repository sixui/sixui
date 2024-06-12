import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Button } from '@/components/atoms/Button';
import { CircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { Scrim, type IScrimProps } from './Scrim';
import { scrimVariants } from './Scrim.styledefs';

const meta = {
  component: Scrim,
} satisfies Meta<typeof Scrim>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <CircularProgressIndicator size='lg' />,
} satisfies Partial<IScrimProps>;

const styles = stylex.create({
  host$contained: {
    position: 'relative',
    display: 'inline-block',
    padding: 32,
  },
});

const ScrimDemo: React.FC<IScrimProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div {...stylex.props(props.contained && styles.host$contained)}>
      <Button onClick={handleOpen}>Show scrim</Button>
      <Scrim {...props} open={open} onClick={handleClose} />
    </div>
  );
};

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <ScrimDemo {...props} />}
      props={props}
      cols={scrimVariants.map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: { variant },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => <ScrimDemo {...props} />,
  args: defaultArgs,
};

export const Contained: IStory = {
  render: (props) => <ScrimDemo {...props} />,
  args: {
    ...defaultArgs,
    contained: true,
  },
};

export default meta;
