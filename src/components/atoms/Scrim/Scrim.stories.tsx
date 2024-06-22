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

import type { IOmit } from '@/helpers/types';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Button } from '@/components/atoms/Button';
import { CircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { Scrim, type IScrimProps } from './Scrim';
import { scrimVariants } from './Scrim.styledefs';

type IScrimDemoProps = IOmit<IScrimProps, 'context'>;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { children, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);

  const floating = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'mousedown',
  });
  const interactions = useInteractions([click, dismiss]);

  return (
    <>
      <Button
        ref={floating.refs.setReference}
        {...interactions.getReferenceProps()}
        onClick={() => setIsOpen(true)}
      >
        Show scrim
      </Button>
      <Scrim context={floating.context} open={isOpen} {...other}>
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
  children: <CircularProgressIndicator size='lg' />,
} satisfies Partial<IScrimProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <ScrimDemo {...props} />}
      props={props}
      cols={scrimVariants.map((variant) => ({
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

export const Contained: IStory = {
  render: (props) => <ScrimDemo {...props} />,
  args: {
    ...defaultArgs,
    contained: true,
  },
};

export default meta;
