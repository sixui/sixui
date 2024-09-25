import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import type { IOmit, IPlacement } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { IMotionProps } from './Motion.types';
import { useToggle } from '~/hooks/useToggle';
import { makeComponentShowcase } from '../ComponentShowcase';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { Motion } from './Motion';

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
        <Motion {...other} status={status} ref={transitionNodeRef} z="$overlay">
          <Placeholder
            surface="$primary"
            c="$onPrimary"
            w="$24"
            h="$24"
            p="$2"
            corner="$sm"
            label="Hi!"
          />
        </Motion>
      )}
    </CSSTransition>
  );
};

const MotionPositionedDemo: React.FC<IMotionDemoProps> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        icon={<FontAwesomeIcon icon={faStar} />}
        selectedIcon={<FontAwesomeIcon icon={faStarSolid} />}
        toggle
        selected={transitioning}
        onClick={() => toggle()}
      />

      <MotionDemo {...props} transitioning={transitioning} />
    </div>
  );
};

const MotionUnpositionedDemo: React.FC<IMotionDemoProps> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <>
      <IconButton
        icon={<FontAwesomeIcon icon={faStar} />}
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
  component: MotionPositionedDemo,
} satisfies Meta<typeof MotionPositionedDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Motion',
} satisfies Partial<IMotionProps>;

const alignments: Array<IComponentPresentation<IMotionDemoProps>> = [
  {
    legend: 'Start',
    props: { placement: { alignment: 'start' } as IPlacement },
  },
  { legend: 'Center' },
  { legend: 'End', props: { placement: { alignment: 'end' } as IPlacement } },
];

const sides: Array<IComponentPresentation<IMotionDemoProps>> = [
  { legend: 'Top', props: { placement: { side: 'top' } } },
  { legend: 'Left', props: { placement: { side: 'left' } } },
  { legend: 'Right', props: { placement: { side: 'right' } } },
  { legend: 'Bottom', props: { placement: { side: 'bottom' } } },
];

const MotionPositionedDemoShowcase =
  makeComponentShowcase(MotionPositionedDemo);

export const Positioned: IStory = {
  render: (props) => (
    <MotionPositionedDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    pattern: 'enterExit',
  },
};

export const PositionedFromCorner: IStory = {
  render: (props) => (
    <MotionPositionedDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'corner',
    pattern: 'enterExit',
  },
};

export const PositionedFromEdge: IStory = {
  render: (props) => (
    <MotionPositionedDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'edge',
    pattern: 'enterExit',
  },
};

export const PositionedFromOffScreen: IStory = {
  render: (props) => (
    <MotionPositionedDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    positioned: true,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

const MotionUnpositionedDemoShowcase = makeComponentShowcase(
  MotionUnpositionedDemo,
);

export const Unpositioned: IStory = {
  render: (props) => <MotionUnpositionedDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    pattern: 'enterExit',
  },
};

export const UnpositionedFromOffScreen: IStory = {
  render: (props) => (
    <MotionUnpositionedDemoShowcase props={props} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

export default meta;
