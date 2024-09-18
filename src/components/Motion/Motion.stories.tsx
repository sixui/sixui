import type { Meta, StoryObj } from '@storybook/react';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile as faFaceSmileSolid } from '@fortawesome/free-solid-svg-icons';

import type { IMotionProps } from './Motion.types';
import type { IOmit } from '~/helpers/types';
import { useToggle } from '~/hooks/useToggle';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Motion } from './Motion';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';

type IMotionDemoProps = IOmit<IMotionProps, 'status'> & {
  transitioning?: boolean;
};

const MotionDemo: React.FC<IMotionDemoProps> = (props) => {
  const { transitioning, ...other } = props;
  const transitionNodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={transitionNodeRef}
      in={transitioning}
      timeout={550}
      unmountOnExit
    >
      {(status) => (
        <Motion {...other} status={status} ref={transitionNodeRef} z='$overlay'>
          <Placeholder
            surface='$primary'
            c='$onPrimary'
            w='$16'
            h='$16'
            corner='$sm'
            label='Hi!'
          />
        </Motion>
      )}
    </CSSTransition>
  );
};

const MotionAnchoredDemo: React.FC<IMotionDemoProps> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        icon={<FontAwesomeIcon icon={faFaceSmile} />}
        selectedIcon={<FontAwesomeIcon icon={faFaceSmileSolid} />}
        toggle
        selected={transitioning}
        onClick={() => toggle()}
      />

      <MotionDemo {...props} transitioning={transitioning} />
    </div>
  );
};

const MotionUnanchoredDemo: React.FC<IMotionDemoProps> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <>
      <IconButton
        icon={<FontAwesomeIcon icon={faFaceSmile} />}
        onClick={() => toggle()}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          overflow: 'auto',
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <MotionDemo {...props} transitioning={transitioning} />
      </div>
    </>
  );
};

const meta = {
  component: MotionAnchoredDemo,
} satisfies Meta<typeof MotionAnchoredDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Motion',
} satisfies Partial<IMotionProps>;

const alignments: Array<IComponentPresentation<IMotionDemoProps>> = [
  { legend: 'Start', props: { alignment: 'start' } },
  { legend: 'Center' },
  { legend: 'End', props: { alignment: 'end' } },
];

const sides: Array<IComponentPresentation<IMotionDemoProps>> = [
  { legend: 'Top', props: { side: 'top' } },
  { legend: 'Left', props: { side: 'left' } },
  { legend: 'Right', props: { side: 'right' } },
  { legend: 'Bottom', props: { side: 'bottom' } },
];

const MotionAnchoredDemoShowcase = makeComponentShowcase(MotionAnchoredDemo);

export const AnchoredToCorner: IStory = {
  render: (props) => (
    <MotionAnchoredDemoShowcase props={props} cols={alignments} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'corner',
    pattern: 'enterExit',
  },
};

export const Anchored: IStory = {
  render: (props) => (
    <MotionAnchoredDemoShowcase props={props} cols={alignments} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    pattern: 'enterExit',
  },
};

export const AnchoredToEdge: IStory = {
  render: (props) => (
    <MotionAnchoredDemoShowcase props={props} cols={alignments} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'edge',
    pattern: 'enterExit',
  },
};

export const AnchoredFromOffScreen: IStory = {
  render: (props) => (
    <MotionAnchoredDemoShowcase props={props} cols={alignments} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

const MotionUnanchoredDemoShowcase =
  makeComponentShowcase(MotionUnanchoredDemo);

export const Unanchored: IStory = {
  render: (props) => <MotionUnanchoredDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    pattern: 'enterExit',
  },
};

export const UnanchoredFromOffScreen: IStory = {
  render: (props) => (
    <MotionUnanchoredDemoShowcase props={props} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

export default meta;
