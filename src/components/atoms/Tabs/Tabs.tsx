import { useCallback, useMemo, useRef } from 'react';

import type { IAny, IOmit, IMaybeAsync } from '@/helpers/types';
import { useControlledValue } from '@/hooks/useControlledValue';
import { EASING } from '@/helpers/animation';
import { shouldReduceMotion } from '@/helpers/shouldReduceAnimations';
import { type ITabContext, TabContext } from './TabContext';
import { useId } from '@/hooks/useId';

export type ITabsProps = IOmit<ITabContext, 'onChange' | 'onTabActivated'> & {
  onChange?: (anchor: string | undefined) => IMaybeAsync<IAny>;
  defaultAnchor?: string;
  children?: React.ReactNode;
};

export const Tabs: React.FC<ITabsProps> = (props) => {
  const {
    children,
    onChange,
    variant,
    anchor: anchorProp,
    defaultAnchor,
    id: idProp,
  } = props;

  const [anchor, setAnchor] = useControlledValue({
    controlled: anchorProp,
    default: defaultAnchor,
    name: 'Tabs',
  });

  const id = useId(idProp);
  const previousTabRef = useRef<HTMLElement | null>(null);
  const indicatorAnimationRef = useRef<Animation>();

  const getIndicatorKeyframes = useCallback(
    (previousTab: HTMLElement, activeTab: HTMLElement): Array<Keyframe> => {
      const reduceMotion = shouldReduceMotion();
      if (reduceMotion) {
        return [
          { opacity: 0 },
          // Note: including `transform: none` avoids quirky Safari behavior that can hide the
          // animation.
          { transform: 'none' },
        ];
      }

      const fromRect = previousTab.getBoundingClientRect();
      const fromPos = fromRect.left;
      const fromExtent = fromRect.width;

      const toRect = activeTab.getBoundingClientRect();
      const toPos = toRect.left;
      const toExtent = toRect.width;

      const translateX = (fromPos - toPos).toFixed(4);
      const scaleX = (fromExtent / toExtent).toFixed(4);

      return [
        { transform: `translateX(${translateX}px) scaleX(${scaleX})` },
        // Note: including `transform: none` avoids quirky Safari behavior that can hide the
        // animation.
        { transform: 'none' },
      ];
    },
    [],
  );

  const contextValue = useMemo(
    () =>
      ({
        id,
        anchor,
        variant,
        onTabActivated(activeTab, indicator) {
          if (!previousTabRef.current) {
            previousTabRef.current = activeTab;

            return;
          }

          indicator?.getAnimations().forEach((animation) => animation.cancel());

          if (activeTab) {
            const previousTab = previousTabRef.current;
            if (previousTab && indicator) {
              indicatorAnimationRef.current = indicator.animate(
                getIndicatorKeyframes(previousTab, activeTab),
                {
                  duration: 150,
                  easing: EASING.EMPHASIZED,
                },
              );
            }

            previousTabRef.current = activeTab;
          }
        },
        onChange(anchor) {
          setAnchor(anchor);
          onChange?.(anchor);
        },
      }) satisfies ITabContext,
    [id, variant, anchor, getIndicatorKeyframes, setAnchor, onChange],
  );

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};
