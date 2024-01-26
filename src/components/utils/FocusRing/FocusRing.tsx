import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from './FocusRing.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IFocusRingProps
  extends IContainer<IFocusRingStyleKey, IFocusRingStyleVarKey> {
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
}

const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing');

interface IFocusRingEvent extends Event {
  [HANDLED_BY_FOCUS_RING]?: true;
}

export const FocusRing: React.FC<IFocusRingProps> = ({
  visualState,
  for: forElementRef,
  inward,
  ...props
}) => {
  const { theme, styles } = useComponentTheme('FocusRing');

  const [visible, setVisible] = React.useState(false);
  const [actionEl, setActionEl] = React.useState<HTMLDivElement | null>();

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IFocusRingStyleKey, IFocusRingStyleVarKey>(
        stylesCombinatorFactory(styles, props.styles),
      ),
    [styles, props.styles],
  );

  const getControl = React.useCallback(
    () => (forElementRef ? forElementRef.current : actionEl?.parentElement),
    [forElementRef, actionEl],
  );

  const handleEvent = React.useCallback(
    (event: IFocusRingEvent): void => {
      if (event[HANDLED_BY_FOCUS_RING]) {
        // This ensures the focus ring does not activate when multiple focus rings
        // are used within a single component.
        return;
      }

      const control = getControl();

      switch (event.type) {
        case 'focus':
          setVisible(control?.matches(':focus-visible') ?? false);
          break;

        case 'blur':
        case 'pointerdown':
          setVisible(false);
          break;
      }

      // eslint-disable-next-line no-param-reassign
      event[HANDLED_BY_FOCUS_RING] = true;
    },
    [getControl],
  );

  React.useEffect(() => {
    const control = getControl();
    if (!control) {
      return;
    }

    const events = ['focus', 'blur', 'pointerdown'] as const;
    events.forEach((event) => control.addEventListener(event, handleEvent));

    return () =>
      events.forEach((event) =>
        control.removeEventListener(event, handleEvent),
      );
  }, [getControl, handleEvent]);

  const visibleOnInit = visualState?.focused;

  return (
    <div
      ref={setActionEl}
      {...styleProps(
        [
          'host',
          (visible || visibleOnInit) && 'host$visible',
          inward ? 'host$inward' : 'host$outward',
        ],
        [theme, props.theme],
      )}
    />
  );
};
