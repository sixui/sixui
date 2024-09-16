import type { Meta, StoryObj } from '@storybook/react';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

import type { IFloatingTransitionProps } from './FloatingTransition.types';
import type { IOmit } from '~/helpers/types';
import { useToggle } from '~/hooks/useToggle';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { FloatingTransition } from './FloatingTransition';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';

type IFloatingTransitionDemoProps = IOmit<
  IFloatingTransitionProps,
  'status'
> & {
  transitioning?: boolean;
};

const FloatingTransitionDemo: React.FC<IFloatingTransitionDemoProps> = (
  props,
) => {
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
        <FloatingTransition
          {...other}
          status={status}
          ref={transitionNodeRef}
          z='$overlay'
        >
          <Placeholder
            surface='$primary'
            c='$onPrimary'
            w='$16'
            h='$16'
            corner='$sm'
            label='Hi!'
          />
        </FloatingTransition>
      )}
    </CSSTransition>
  );
};

const FloatingTransitionAnchoredDemo: React.FC<IFloatingTransitionDemoProps> = (
  props,
) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        icon={<FontAwesomeIcon icon={faFaceSmile} />}
        onPress={() => toggle()}
      />

      <FloatingTransitionDemo {...props} transitioning={transitioning} />
    </div>
  );
};

const FloatingTransitionUnanchoredDemo: React.FC<
  IFloatingTransitionDemoProps
> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <>
      <IconButton
        icon={<FontAwesomeIcon icon={faFaceSmile} />}
        onPress={() => toggle()}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          overflow: 'auto',
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <FloatingTransitionDemo {...props} transitioning={transitioning} />
      </div>
    </>
  );
};

const meta = {
  component: FloatingTransitionAnchoredDemo,
} satisfies Meta<typeof FloatingTransitionAnchoredDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'FloatingTransition',
} satisfies Partial<IFloatingTransitionProps>;

const alignments: Array<IComponentPresentation<IFloatingTransitionDemoProps>> =
  [
    { legend: 'Start', props: { alignment: 'start' } },
    { legend: 'Center' },
    { legend: 'End', props: { alignment: 'end' } },
  ];

const sides: Array<IComponentPresentation<IFloatingTransitionDemoProps>> = [
  { legend: 'Top', props: { side: 'top' } },
  { legend: 'Left', props: { side: 'left' } },
  { legend: 'Right', props: { side: 'right' } },
  { legend: 'Bottom', props: { side: 'bottom' } },
];

const FloatingTransitionAnchoredDemoShowcase = makeComponentShowcase(
  FloatingTransitionAnchoredDemo,
);

export const AnchoredToCorner: IStory = {
  render: (props) => (
    <FloatingTransitionAnchoredDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    anchored: true,
    origin: 'corner',
    pattern: 'enterExit',
  },
};

export const Anchored: IStory = {
  render: (props) => (
    <FloatingTransitionAnchoredDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    anchored: true,
    pattern: 'enterExit',
  },
};

export const AnchoredToEdge: IStory = {
  render: (props) => (
    <FloatingTransitionAnchoredDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    anchored: true,
    origin: 'edge',
    pattern: 'enterExit',
  },
};

export const AnchoredFromOffScreen: IStory = {
  render: (props) => (
    <FloatingTransitionAnchoredDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    anchored: true,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

const FloatingTransitionUnanchoredDemoShowcase = makeComponentShowcase(
  FloatingTransitionUnanchoredDemo,
);

export const Unanchored: IStory = {
  render: (props) => <FloatingTransitionUnanchoredDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    pattern: 'enterExit',
  },
};

export const UnanchoredFromOffScreen: IStory = {
  render: (props) => (
    <FloatingTransitionUnanchoredDemoShowcase props={props} rows={sides} />
  ),
  args: {
    ...defaultArgs,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

export default meta;
