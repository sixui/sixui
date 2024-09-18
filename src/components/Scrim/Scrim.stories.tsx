import type { Meta, StoryObj } from '@storybook/react';

import type { IScrimProps } from './Scrim.types';
import { Button } from '../Button';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Scrim } from './Scrim';
import { useToggle } from '~/hooks/useToggle';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type IScrimDemoProps = IScrimProps;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { ...other } = props;
  const [isVisible, toggleIsVisible] = useToggle([false, true]);

  return (
    <>
      <Button onClick={() => toggleIsVisible()}>Show scrim</Button>
      {isVisible && <Scrim {...other} onClick={() => toggleIsVisible(false)} />}
    </>
  );
};

const meta = {
  component: ScrimDemo,
} satisfies Meta<typeof ScrimDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IScrimProps>;

const ScrimDemoShowcase = makeComponentShowcase(ScrimDemo);

export const Basic: IStory = {
  render: (props) => <ScrimDemoShowcase props={props} />,
  args: defaultArgs,
};

export const Blurred: IStory = {
  render: (props) => <ScrimDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    style: assignInlineVars({
      [Scrim.theme.tokens.container.filter]: 'blur(2px)',
    }),
  },
};

export default meta;
