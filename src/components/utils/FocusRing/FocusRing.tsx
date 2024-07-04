import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from './FocusRing.styledefs';
import type { IVisualState } from '@/hooks/useVisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useForkRef } from '@/hooks/useForkRef';

export type IFocusRingProps = IContainerProps<IFocusRingStyleKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
};

const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing');

type IFocusRingEvent = Event & {
  [HANDLED_BY_FOCUS_RING]?: true;
};

export const FocusRing = forwardRef<HTMLInputElement, IFocusRingProps>(
  function FocusRing(props, forwardedRef) {
    const { styles, sx, visualState, for: forElementRef, inward } = props;

    const { theme } = useComponentTheme('FocusRing');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IFocusRingStyleKey, IFocusRingStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const hostRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(forwardedRef, hostRef);

    const [visible, setVisible] = useState(false);

    const getControl = useCallback(
      () =>
        forElementRef ? forElementRef.current : hostRef?.current?.parentElement,
      [forElementRef],
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
        ref={handleRef}
        {...sxf(
          'host',
          (visible || visibleOnInit) && 'host$visible',
          inward ? 'host$inward' : 'host$outward',
          theme.vars,
          sx,
        )}
      />
    );
  },
);
