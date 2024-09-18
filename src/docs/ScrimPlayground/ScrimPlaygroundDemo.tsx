import { useRef, useState } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import type { IScrimProps } from '~/components/Scrim';
import { Button } from '~/components/Button';
import { Scrim } from '~/components/Scrim';

export type IScrimPlaygroundDemoProps = {
  scrim: IScrimProps;
};

export const ScrimPlaygroundDemo: React.FC<IScrimPlaygroundDemoProps> = (
  props,
) => {
  const { children, ...scrimProps } = props.scrim;
  const [opened, setOpened] = useState(false);
  const scrimRef = useRef<HTMLDivElement>(null);
  const floating = useFloating<HTMLButtonElement>({
    open: opened,
    onOpenChange: setOpened,
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
          onClick: () => setOpened(true),
        })}
      >
        Show scrim
      </Button>
      <Scrim
        lockScroll={true}
        {...scrimProps}
        floatingContext={floating.context}
        ref={scrimRef}
      />
      <FloatingFocusManager context={floating.context}>
        <div
          {...interactions.getFloatingProps()}
          ref={floating.refs.setFloating}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </>
  );
};
