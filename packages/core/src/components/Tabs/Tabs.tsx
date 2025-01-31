import { useCallback, useMemo, useRef } from 'react';

import type { ITabsContextValue } from './Tabs.context';
import type { ITabsThemeFactory } from './Tabs.css';
import type { ITabsFactory } from './Tabs.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { componentFactory } from '~/utils/component/componentFactory';
import { shouldReduceMotion } from '~/utils/shouldReduceAnimations';
import { COMPONENT_NAME } from './Tabs.constants';
import { TabsContextProvider } from './Tabs.context';
import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
import { TabsTab } from './TabsTab';
import { basicTemplateTheme } from './Tabs.css';

export const Tabs = componentFactory<ITabsFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
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

  const { getStyles } = useComponentTheme<ITabsThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: basicTemplateTheme,
  });

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
      <Box {...getStyles('root')} ref={forwardedRef} {...other} />
    </TabsContextProvider>
  );
});

Tabs.theme = basicTemplateTheme;
Tabs.displayName = `@sixui/${COMPONENT_NAME}`;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
