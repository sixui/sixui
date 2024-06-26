import stylex from '@stylexjs/stylex';
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  size,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStatus,
  useTypeahead,
  type Placement,
} from '@floating-ui/react';

import type { IAny, IOmit } from '@/helpers/types';
import type { IVisualState } from '@/hooks/useVisualState';
import type { IListItemsProps } from './ListItemProps';
import type { ITextFieldProps } from '@/components/atoms/TextField';
import { MenuList, MenuListDivider } from '@/components/atoms/MenuList';
import { Field, IFieldProps } from '@/components/atoms/Field';
import { composeFloatingProps } from '@/helpers/composeFloatingProps';
import { Portal } from '@/components/utils/Portal';
import { InputChip } from '@/components/atoms/Chip';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { placementToOrigin } from '@/helpers/placementToOrigin';
import { commonStyles } from '@/helpers/commonStyles';
import { SelectContext } from './SelectContext';
import { SelectOption, type ISelectOptionProps } from './SelectOption';
import { QueryList } from './QueryList';

type ISelectBaseButtonRenderProps<TItem> = {
  ref: React.Ref<HTMLButtonElement>;
  props: React.HTMLAttributes<HTMLButtonElement>;
  isOpen: boolean;
  activeItem?: TItem | null;
};

export type ISelectBaseProps<TItem> = IListItemsProps<TItem> & {
  /**
   * Element which triggers the select popover. In most cases, you should display
   * the name or label of the curently selected item here.
   */
  children: (props: ISelectBaseButtonRenderProps<TItem>) => React.ReactNode;

  /**
   * Whether the component is non-interactive.
   * If true, the list's item renderer will not be called.
   * Note that you'll also need to disable the component's children, if appropriate.
   *
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Whether the component should take up the full width of its container.
   * You also have to ensure that the child component has `fill` set to `true` or is styled appropriately.
   */
  fill?: boolean;

  /**
   * Whether the dropdown list can be filtered.
   * Disabling this option will remove the `InputGroup` and ignore `inputProps`.
   *
   * @defaultvalue true
   */
  filterable?: boolean;

  /**
   * Props to pass to the query [InputGroup component](#core/components/input-group).
   *
   * Some properties are unavailable:
   * - `inputProps.value`: use `query` instead
   * - `inputProps.onChange`: use `onQueryChange` instead
   */
  inputProps?: Partial<Omit<ITextFieldProps, 'value' | 'onChange'>>;

  /**
   * HTML attributes to add to the `Menu` listbox containing the selectable options.
   */
  menuProps?: React.HTMLAttributes<HTMLUListElement>;

  /**
   * Whether the active item should be reset to the first matching item _when
   * the popover closes_. The query will also be reset to the empty string.
   *
   * @defaultValue false
   */
  resetOnClose?: boolean;
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

type ISelectBase = <TItem extends IAny>(
  props: ISelectBaseProps<TItem> & {
    ref?: React.ForwardedRef<HTMLElement>;
  },
) => React.ReactNode;

const SelectBase: ISelectBase = forwardRef(function SelectBase(
  props,
  forwardedRef?: React.ForwardedRef<HTMLElement>,
) {
  type TItem = (typeof items)[number];

  const {
    items,
    children,
    activeItem,
    placement = 'bottom-start',
    ...other
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedOptionProps, setSelectedOptionProps] =
    useState<ISelectOptionProps>();
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

  // const handleSelect = useCallback(
  //   (index: number | null, props: ISelectOptionProps): void => {
  //     setSelectedIndex(index);
  //     setIsOpen(false);

  //     const selectedLabel =
  //       index !== null ? labelsRef.current[index] : undefined;
  //     if (selectedLabel !== undefined) {
  //       setSelectedLabel(selectedLabel);
  //       setSelectedOptionProps(props);
  //     }

  //     if (multiple === false) {
  //       onChange?.(props.value ?? selectedLabel ?? '');
  //     }
  //   },
  //   [multiple, onChange],
  // );

  const handleTypeaheadMatch = (index: number | null): void => {
    if (isOpen) {
      setActiveIndex(index);
    }
  };

  const listNavigation = useListNavigation(floating.context, {
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
    listNavigation,
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
      // handleSelect,
    }),
    [activeIndex, selectedIndex, interactions.getItemProps],
  );
  const handleRef = useMergeRefs([floating.refs.setReference, forwardedRef]);

  const openVisualState: IVisualState = { focused: true };
  const openProps = { visualState: openVisualState };

  // const renderOption = (): React.ReactNode => {
  //   if (!selectedLabel || !selectedOptionProps) {
  //     return null;
  //   }

  //   if (multiple) {
  //     return null;
  //   } else {
  //     return (renderSelectedOption ?? defaultRenderSelectedOption)({
  //       label: selectedLabel,
  //       props: selectedOptionProps,
  //     });
  //   }
  // };

  const { filterable, inputProps, menuProps, ...queryListProps } = props;

  const handleItemSelect = (
    item: TItem,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => {
    console.log('______SELECT', { item, event });
  };

  return (
    <>
      {children({
        ref: handleRef,
        props: {
          tabIndex: 0,
          ...interactions.getReferenceProps(),
        },
        isOpen,
        activeItem,
      })}
      {transitionStatus.isMounted && (
        <SelectContext.Provider value={selectContext}>
          <Portal>
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
                  <MenuList>
                    <FloatingList
                      elementsRef={elementsRef}
                      labelsRef={labelsRef}
                    >
                      <QueryList<TItem>
                        {...queryListProps}
                        menuProps={{
                          'aria-label': 'selectable options',
                          ...menuProps,
                        }}
                        onItemSelect={handleItemSelect}
                        // ref={this.handleQueryListRef}
                        renderer={() => 'ITEM'}
                      />
                    </FloatingList>
                  </MenuList>
                </div>
              </div>
            </FloatingFocusManager>
          </Portal>
        </SelectContext.Provider>
      )}
    </>
  );
});

const SelectBaseNamespace = Object.assign(SelectBase, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectBaseNamespace as SelectBase };
