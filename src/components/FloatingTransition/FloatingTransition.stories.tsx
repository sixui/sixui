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

type IFloatingTransitionDemoProps = IOmit<IFloatingTransitionProps, 'status'>;

const FloatingTransitionDemo: React.FC<IFloatingTransitionDemoProps> = (
  props,
) => {
  const [transitioning, toggle] = useToggle([false, true]);
  const transitionNodeRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        icon={<FontAwesomeIcon icon={faFaceSmile} />}
        onPress={() => toggle()}
      />

      <CSSTransition
        nodeRef={transitionNodeRef}
        in={transitioning}
        timeout={550}
        unmountOnExit
      >
        {(status) => (
          <FloatingTransition
            {...props}
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
    </div>
  );
};

const meta = {
  component: FloatingTransitionDemo,
} satisfies Meta<typeof FloatingTransitionDemo>;

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

const FloatingTransitionDemoShowcase = makeComponentShowcase(
  FloatingTransitionDemo,
);

export const FromCorner: IStory = {
  render: (props) => (
    <FloatingTransitionDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    origin: 'corner',
    pattern: 'enterExit',
  },
};

export const FromEdge: IStory = {
  render: (props) => (
    <FloatingTransitionDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    origin: 'edge',
    pattern: 'enterExit',
  },
};

export const FromCenter: IStory = {
  render: (props) => (
    <FloatingTransitionDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    origin: 'center',
    pattern: 'enterExit',
  },
};

export const FromOffScreen: IStory = {
  render: (props) => (
    <FloatingTransitionDemoShowcase
      props={props}
      cols={alignments}
      rows={sides}
    />
  ),
  args: {
    ...defaultArgs,
    origin: 'edge',
    pattern: 'enterExitOffScreen',
  },
};

export default meta;
