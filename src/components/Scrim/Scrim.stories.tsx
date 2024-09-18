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
import { makeComponentShowcase } from '../ComponentShowcase';
import { Button } from '../Button';
import { Scrim } from './Scrim';

type IScrimDemoProps = IOmit<IScrimProps, 'floatingContext'>;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { children, ...other } = props;
  const [opened, setOpened] = useState(false);

  const floating = useFloating<HTMLButtonElement>({
    open: opened,
    onOpenChange: setOpened,
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
          onClick: () => setOpened(true),
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

const defaultArgs = {} satisfies Partial<IScrimProps>;

const ScrimDemoShowcase = makeComponentShowcase(ScrimDemo);

export const Variants: IStory = {
  render: (props) => (
    <ScrimDemoShowcase
      props={props}
      cols={(['darken', 'lighten'] as Array<IScrimVariant>).map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: { variant },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
