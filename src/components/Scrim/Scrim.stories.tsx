import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { IOmit } from '~/helpers/types';
import type { IScrimProps, IScrimVariant } from './Scrim.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Button } from '../Button';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Scrim } from './Scrim';

type IScrimDemoProps = IOmit<IScrimProps, 'floatingContext'>;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { children, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);

  const floating = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'pointerdown',
  });
  const interactions = useInteractions([click, dismiss]);

  return (
    <>
      <Button
        {...interactions.getReferenceProps({
          ref: floating.refs.setReference,
          onClick: () => setIsOpen(true),
        })}
      >
        Show scrim
      </Button>
      <Scrim floatingContext={floating.context} {...other}>
        <FloatingFocusManager context={floating.context}>
          <div
            {...interactions.getFloatingProps()}
            ref={floating.refs.setFloating}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </Scrim>
    </>
  );
};

const meta = {
  component: ScrimDemo,
} satisfies Meta<typeof ScrimDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <IndeterminateCircularProgressIndicator size='lg' />,
} satisfies Partial<IScrimProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <ScrimDemo {...props} />}
      props={props}
      cols={(['darken', 'lighten'] as Array<IScrimVariant>).map((variant) => ({
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

export default meta;
