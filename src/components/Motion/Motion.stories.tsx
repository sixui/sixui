import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import type { IOmit } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type { IMotionProps } from './Motion.types';
import { useToggle } from '~/hooks/useToggle';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { Motion } from './Motion';

type IMotionDemoProps = IOmit<IMotionProps, 'status'> & {
  transitioning?: boolean;
  onClose?: () => void;
};

const MotionDemo: React.FC<IMotionDemoProps> = (props) => {
  const { transitioning, onClose: _onClose, ...other } = props;
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
            surface="$inverseSurface"
            c="$inverseOnSurface"
            w="$24"
            h="$24"
            p="$2"
            shape="$sm"
            label="Hi!"
          />
        </Motion>
      )}
    </CSSTransition>
  );
};

const MotionUnpositionedDemo: React.FC<IMotionDemoProps> = (props) => {
  const [transitioning, toggle] = useToggle([false, true]);

  return (
    <>
      <IconButton
        icon={<FontAwesomeIcon icon={faStar} />}
        selectedIcon={<FontAwesomeIcon icon={fasStar} />}
        toggle
        selected={transitioning}
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
          zIndex: themeTokens.zIndex.modal,
        }}
      >
        <MotionDemo
          {...props}
          transitioning={transitioning}
          onClose={() => toggle(false)}
        />
      </div>
    </>
  );
};

const meta = {
  component: MotionDemo,
} satisfies Meta<typeof MotionDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Motion',
} satisfies Partial<IMotionProps>;

const sides: Array<IComponentPresentation<IMotionDemoProps>> = [
  { legend: 'From top', props: { placement: { side: 'top' } } },
  { legend: 'From left', props: { placement: { side: 'left' } } },
  { legend: 'From right', props: { placement: { side: 'right' } } },
  { legend: 'From bottom', props: { placement: { side: 'bottom' } } },
];

const MotionUnpositionedDemoShowcase = componentShowcaseFactory(
  MotionUnpositionedDemo,
);

export const EnterExit: IStory = {
  render: (props) => <MotionUnpositionedDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    pattern: 'enterExit',
  },
};

export const EnterExitOffScreen: IStory = {
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
