import { useCallback, useMemo, useRef } from 'react';

import type { ITabsContextValue } from './Tabs.context';
import type { ITabsFactory } from './Tabs.types';
import { Box } from '~/components/Box';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { componentFactory } from '~/utils/component/componentFactory';
import { shouldReduceMotion } from '~/utils/shouldReduceAnimations';
import { COMPONENT_NAME } from './Tabs.constants';
import { TabsContextProvider } from './Tabs.context';
import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
import { TabsTab } from './TabsTab';

/**
 * @see https://m3.material.io/components/tabs/overview
 */
export const Tabs = componentFactory<ITabsFactory>((props, forwardedRef) => {
  const {
    variant,
    id: idProp,
    onChange,
    disabled,
    anchor: anchorProp,
    defaultAnchor,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const id = useId(idProp);
  const previousTabRef = useRef<HTMLElement>(null);
  const indicatorAnimationRef = useRef<Animation>(null);

  const [anchor, setAnchor] = useControlledValue({
    controlled: anchorProp,
    default: defaultAnchor,
    name: COMPONENT_NAME,
  });

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

  const contextValue: ITabsContextValue = useMemo(
    () => ({
      id,
      anchor,
      variant,
      onTabActivated: (activeTab, indicator) => {
        if (!previousTabRef.current) {
          previousTabRef.current = activeTab;

          return;
        }

        indicator.getAnimations().forEach((animation) => {
          animation.cancel();
        });

        const previousTab = previousTabRef.current;
        indicatorAnimationRef.current = indicator.animate(
          getIndicatorKeyframes(previousTab, activeTab),
          {
            duration: 150,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
          },
        );

        previousTabRef.current = activeTab;
      },
      onChange(anchor) {
        setAnchor(anchor);
        onChange?.(anchor);
      },
      disabled,
    }),
    [id, variant, anchor, getIndicatorKeyframes, setAnchor, onChange, disabled],
  );

  return (
    <TabsContextProvider value={contextValue}>
      <Box ref={forwardedRef} {...other} />
    </TabsContextProvider>
  );
});

Tabs.displayName = `@sixui/core/${COMPONENT_NAME}`;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
