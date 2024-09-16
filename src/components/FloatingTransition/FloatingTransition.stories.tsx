import type { Meta, StoryObj } from '@storybook/react';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import type { IFloatingTransitionProps } from './FloatingTransition.types';
import type { IOmit } from '~/helpers/types';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { FloatingTransition } from './FloatingTransition';
import { Button } from '../Button';
import { useToggle } from '~/hooks/useToggle';

type IFloatingTransitionDemoProps = IOmit<IFloatingTransitionProps, 'status'>;

const FloatingTransitionDemo: React.FC<IFloatingTransitionDemoProps> = (
  props,
) => {
  const [transitioning, toggle] = useToggle([false, true]);
  const transitionNodeRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: 'relative', border: '1px solid blue' }}>
      <Button onPress={() => toggle()}>XXX</Button>

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
            style={{
              position: 'absolute',
              border: '1px solid red',
            }}
          >
            XXX
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

const variants: Array<IComponentPresentation<IFloatingTransitionProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IFloatingTransitionProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const FloatingTransitionDemoShowcase = makeComponentShowcase(
  FloatingTransitionDemo,
);

export const Basic: IStory = {
  render: (props) => (
    <FloatingTransitionDemoShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: {
    ...defaultArgs,
    placement: 'left',
    origin: 'edge',
    orientation: 'vertical',
    pattern: 'enterExitOffScreen',
  },
};

export default meta;
