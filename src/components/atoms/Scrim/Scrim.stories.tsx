import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/atoms/Button';
import { CircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { Scrim, type IScrimProps } from './Scrim';

const meta = {
  component: Scrim,
} satisfies Meta<typeof Scrim>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IScrimProps>;

const ScrimDemo: React.FC<IScrimProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Show scrim</Button>
      <Scrim {...props} open={open} onClick={handleClose} />
    </>
  );
};

export const Basic: IStory = {
  render: (props) => <ScrimDemo {...props} />,
  args: {
    ...defaultArgs,
    children: <CircularProgressIndicator size='lg' />,
  },
};

export default meta;
