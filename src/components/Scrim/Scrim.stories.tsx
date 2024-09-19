import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { CSSTransition } from 'react-transition-group';

import type { IScrimProps } from './Scrim.types';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Motion } from '../Motion';
import { themeTokens } from '../ThemeProvider';
import { Scrim } from './Scrim';

type IScrimDemoProps = IScrimProps;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { ...other } = props;
  const [isVisible, toggleIsVisible] = useToggle([false, true]);

  return (
    <>
      <Button onClick={() => toggleIsVisible()}>
        {isVisible ? 'Click on the scrim to dismiss' : 'Show scrim'}
      </Button>
      {isVisible && <Scrim {...other} onClick={() => toggleIsVisible(false)} />}
    </>
  );
};

type IAnimatedScrimDemoProps = IScrimProps;

const AnimatedScrimDemo: React.FC<IAnimatedScrimDemoProps> = (props) => {
  const { ...other } = props;
  const [isVisible, toggleIsVisible] = useToggle([false, true]);
  const transitionNodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button onClick={() => toggleIsVisible()}>
        {isVisible ? 'Click on the scrim to dismiss' : 'Show scrim'}
      </Button>

      <CSSTransition
        nodeRef={transitionNodeRef}
        in={isVisible}
        timeout={150}
        unmountOnExit
      >
        {(status) => (
          <Motion status={status} ref={transitionNodeRef} pattern="fade">
            <Scrim {...other} onClick={() => toggleIsVisible(false)} />
          </Motion>
        )}
      </CSSTransition>
    </>
  );
};

const meta = {
  component: ScrimDemo,
} satisfies Meta<typeof ScrimDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IScrimProps>;

const ScrimDemoShowcase = makeComponentShowcase(ScrimDemo);
const AnimatedScrimDemoShowcase = makeComponentShowcase(AnimatedScrimDemo);

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

export const Colorized: IStory = {
  render: (props) => <ScrimDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    style: assignInlineVars({
      [Scrim.theme.tokens.container.color]:
        `color-mix(in srgb, ${themeTokens.colorScheme.error} 30%, transparent)`,
    }),
  },
};

export const Animated: IStory = {
  render: (props) => <AnimatedScrimDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
