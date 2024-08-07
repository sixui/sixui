import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IFocusRingProps } from './FocusRing.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { focusRingStyles } from './FocusRing.styles';
import { focusRingTheme } from './FocusRing.stylex';

const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing');

type IFocusRingEvent = Event & {
  [HANDLED_BY_FOCUS_RING]?: true;
};

export const FocusRing = forwardRef<HTMLInputElement, IFocusRingProps>(
  function FocusRing(props, forwardedRef) {
    const { styles, sx, visualState, for: forElementRef, inward } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'FocusRing',
      styles: [focusRingStyles, styles],
    });

    const hostRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs([forwardedRef, hostRef]);

    const [visible, setVisible] = useState(false);

    const getControl = useCallback(
      () => forElementRef?.current ?? hostRef?.current?.parentElement,
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
      <Base
        ref={handleRef}
        sx={[
          focusRingTheme,
          globalStyles,
          combineStyles(
            'host',
            (visible || visibleOnInit) && 'host$visible',
            inward ? 'host$inward' : 'host$outward',
          ),
          sx,
        ]}
      />
    );
  },
);
