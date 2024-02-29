import { useCallback, useEffect, useMemo, useState } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from './FocusRing.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IFocusRingProps = IContainerProps<
  IFocusRingStyleKey,
  IFocusRingStyleVarKey
> & {
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
};

const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing');

type IFocusRingEvent = Event & {
  [HANDLED_BY_FOCUS_RING]?: true;
};

export const FocusRing: React.FC<IFocusRingProps> = ({
  visualState,
  for: forElementRef,
  inward,
  ...props
}) => {
  const theme = useComponentTheme('FocusRing');

  const [visible, setVisible] = useState(false);
  const [actionEl, setActionEl] = useState<HTMLDivElement | null>();

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IFocusRingStyleKey, IFocusRingStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const getControl = useCallback(
    () => (forElementRef ? forElementRef.current : actionEl?.parentElement),
    [forElementRef, actionEl],
  );

  const handleEvent = useCallback(
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

  useEffect(() => {
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
          props.sx,
        ],
        [theme.vars, props.theme],
      )}
    />
  );
};
