import stylex from '@stylexjs/stylex';
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  type Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStatus,
  useTypeahead,
} from '@floating-ui/react';

import type { IOmit } from '@/helpers/types';
import type { IVisualState } from '@/hooks/useVisualState';
import { MenuList, MenuListDivider } from '@/components/atoms/MenuList';
import { Field, IFieldProps } from '@/components/atoms/Field';
import { getFloatingPropsWrapper } from '@/helpers/getFloatingPropsWrapper';
import { Portal } from '@/components/utils/Portal';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { placementToOrigin } from '@/helpers/placementToOrigin';
import { SelectContext } from './SelectContext';
import { SelectOption } from './SelectOption';

export type ISelectProps = IOmit<IFieldProps, 'value'> &
  React.HTMLProps<Element> & {
    children?: React.ReactNode;
    placement?: Placement;
  };

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    zIndex: 499,
    flexGrow: 1,
    display: 'flex',
  },
  transition$unmounted: {},
  transition$initial: {
    transform: 'scaleY(0.5)',
  },
  transition$open: {
    transform: 'scaleY(1)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$long3,
    transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  transition$close: {
    transform: 'scaleY(0)',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
  transition$unmounted$nested: {},
  transition$initial$nested: {},
  transition$open$nested: {
    transition: 'none',
  },
  transition$close$nested: {
    transition: 'none',
  },
  transformOrigin: (placement: Placement) => ({
    transformOrigin: placementToOrigin(placement),
  }),
});

const Select = forwardRef<HTMLDivElement, ISelectProps>(
  function Select(props, forwardedRef) {
    const { children, placement = 'bottom-start', ...other } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const floating = useFloating({
      placement: placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              display: 'flex',
            });
          },
        }),
        flip(),
      ],
    });
    const transitionStatus = useTransitionStatus(floating.context, {
      duration: 150, // motionVars.duration$short3
    });
    const elementsRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);

    const handleSelect = useCallback((index: number | null): void => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (index !== null) {
        setSelectedLabel(labelsRef.current[index]);
      }
    }, []);

    const handleTypeaheadMatch = (index: number | null): void => {
      if (isOpen) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    };

    const listNav = useListNavigation(floating.context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      focusItemOnHover: false,
      focusItemOnOpen: 'auto',
    });
    const typeahead = useTypeahead(floating.context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: handleTypeaheadMatch,
    });
    const click = useClick(floating.context, {
      event: 'mousedown',
    });
    const dismiss = useDismiss(floating.context);
    const role = useRole(floating.context, { role: 'listbox' });
    const interactions = useInteractions([
      listNav,
      typeahead,
      click,
      dismiss,
      role,
    ]);
    const selectContext = useMemo(
      () => ({
        activeIndex,
        selectedIndex,
        getItemProps: interactions.getItemProps,
        handleSelect,
      }),
      [activeIndex, selectedIndex, interactions.getItemProps, handleSelect],
    );
    const handleRef = useMergeRefs([floating.refs.setReference, forwardedRef]);

    const openVisualState: IVisualState = { focused: true };
    const openProps = { visualState: openVisualState };
    const TrailingIcon = transitionStatus.isMounted
      ? TriangleUpIcon
      : TriangleDownIcon;

    return (
      <>
        <Field
          // start={
          //   typeof matchingOption === 'string'
          //     ? undefined
          //     : matchingOption?.props.start
          // }
          // leadingIcon={
          //   typeof matchingOption === 'string'
          //     ? undefined
          //     : matchingOption?.props.leadingIcon
          // }
          end={<TrailingIcon />}
          {...getFloatingPropsWrapper<IFieldProps>(
            interactions.getReferenceProps,
            {
              tabIndex: 0,
              value: selectedLabel,
              ...(transitionStatus.isMounted ? openProps : undefined),
              ...other,
              containerRef: handleRef,
            },
          )}
        />
        {transitionStatus.isMounted && (
          <SelectContext.Provider value={selectContext}>
            <Portal>
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <FloatingFocusManager context={floating.context} modal={false}>
                  <div
                    {...stylex.props(styles.host)}
                    {...interactions.getFloatingProps()}
                    ref={floating.refs.setFloating}
                    style={floating.floatingStyles}
                  >
                    <div
                      {...stylex.props(
                        styles.host,
                        styles.transformOrigin(floating.placement),
                        styles[`transition$${transitionStatus.status}`],
                      )}
                    >
                      <MenuList>{children}</MenuList>
                    </div>
                  </div>
                </FloatingFocusManager>
              </FloatingList>
            </Portal>
          </SelectContext.Provider>
        )}
      </>
    );
  },
);

const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectNamespace as Select };
