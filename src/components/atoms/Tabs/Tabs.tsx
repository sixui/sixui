import React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';
import { useControlled } from '@/hooks/useControlled';
import { EASING } from '@/helpers/animation';
import { shouldReduceMotion } from '@/helpers/shouldReduceAnimations';
import { type ITabsContextValue, TabsContext } from './TabsContext';

export interface ITabsProps
  extends Omit<ITabsContextValue, 'onChange'>,
    Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  onChange?: (anchor: string | undefined) => IMaybeAsync<IAny>;
  defaultAnchor?: string;
  children?: React.ReactNode;
}

export const Tabs: React.FC<ITabsProps> = ({
  children,
  onChange,
  ...props
}) => {
  const [anchor, setAnchor] = useControlled({
    controlled: props.anchor,
    default: props.defaultAnchor,
    name: 'Tabs',
  });

  const previousTabRef = React.useRef<HTMLElement | null>(null);
  const indicatorAnimationRef = React.useRef<Animation>();

  const getIndicatorKeyframes = React.useCallback(
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

  const contextValue = React.useMemo(
    () =>
      ({
        anchor,
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
      }) satisfies ITabsContextValue,
    [onChange, anchor, setAnchor, getIndicatorKeyframes],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
