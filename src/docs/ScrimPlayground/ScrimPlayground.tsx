import { useRef, useState } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { IPlaygroundSections } from '~/docs/Playground';
import type { IOmit } from '~/helpers/types';
import { Scrim, type IScrimProps } from '~/components/Scrim';
import { Playground } from '~/docs/Playground';
import { Button } from '~/components/Button';

type IScrimDemoProps = IOmit<IScrimProps, 'floatingContext'>;

const ScrimDemo: React.FC<IScrimDemoProps> = (props) => {
  const { children, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);
  const scrimRef = useRef<HTMLDivElement>(null);
  const floating = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'pointerdown',
    outsidePress: (mouseEvent) => {
      // Make sure that the scrim is dismissed only when clicking on the scrim
      // element.
      if (scrimRef.current && mouseEvent.target instanceof Node) {
        return scrimRef.current.contains(mouseEvent.target);
      }
      return true;
    },
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
      <Scrim
        lockScroll={true}
        {...other}
        floatingContext={floating.context}
        ref={scrimRef}
      >
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

const defaultSections: IPlaygroundSections<IScrimDemoProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Variant',
        input: {
          type: 'string',
          value: 'darken',
          items: [
            { label: 'Darken', value: 'darken' },
            { label: 'Lighten', value: 'lighten' },
          ],
          targetProp: 'variant',
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Contained',
        props: {
          contained: true,
          lockScroll: false,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

export const ScrimPlayground: React.FC = (props) => {
  return (
    <Playground<IScrimDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => <ScrimDemo {...componentProps} />}
    />
  );
};
