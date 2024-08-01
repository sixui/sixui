import { useRef, useState } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { Scrim, type IScrimProps } from '~/components/Scrim';
import { Button } from '~/components/Button';

export type IScrimPlaygroundDemoProps = {
  scrim: IScrimProps;
};

export const ScrimPlaygroundDemo: React.FC<IScrimPlaygroundDemoProps> = (
  props,
) => {
  const { children, ...scrimProps } = props.scrim;
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
        {...scrimProps}
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
