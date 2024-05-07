import stylex from '@stylexjs/stylex';
import {
  Fragment,
  forwardRef,
  useState,
  Children,
  isValidElement,
  useRef,
} from 'react';
import { Combobox as Autocomplete, Transition } from '@headlessui/react';
import { asArray } from '@olivierpascal/helpers';
import { useFloating } from '@floating-ui/react-dom';
import { size } from '@floating-ui/dom';
import { FloatingPortal } from '@floating-ui/react';

import { createFilter, type IFilter } from '@/helpers/createFilter';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { IconButton } from '@/components/atoms/IconButton';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { reactNodeToString } from '@/helpers/react/nodeToString';
import { componentVars as fieldBaseVars } from '@/themes/base/FieldBase/FieldBase.stylex';
import { InputChip } from '@/components/atoms/Chip';
import { useControlled } from '@/hooks/useControlled';
import { isElementLike } from '@/helpers/react/isElementLike';
import { ComboboxOption, type IComboboxOptionProps } from './ComboboxOption';

const MIN_DELAY_BETWEEN_CLOSE_AND_OPEN = 300;

type IOption = React.ReactElement<IComboboxOptionProps>;

export type IComboboxBaseProps = Omit<
  ITextFieldProps,
  'onChange' | 'end' | 'value' | 'defaultValue' | 'id'
> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode> | null;
  id?: string;
  filter?: IFilter<IOption>;
  noOptionsText?: string;
  createOptionText?: (query: string) => string;
  allowCustomValues?: boolean;
} & (
    | {
        multiple: false;
        value?: string | null;
        defaultValue?: string;
        onChange?: (value: string) => void;
        limit?: number;
        moreOption?:
          | React.ReactNode
          | ((props: { total: number; hidden: number }) => React.ReactNode);
        selectOnFocus?: boolean;
        nullable?: boolean;
      }
    | {
        multiple: true;
        value?: Array<string>;
        defaultValue?: Array<string>;
        onChange?: (value: Array<string>) => void;
        limit?: undefined;
        moreOption?: undefined;
        selectOnFocus?: undefined;
        nullable?: undefined;
      }
  );

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  host$disabled: {
    cursor: 'default',
  },
  options: {
    zIndex: 999,
  },
  menuList: {
    maxHeight: 320,
  },
});

// TODO: migrate in theme
const fieldStyles = stylex.create({
  contentSlot: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingInlineEnd: fieldBaseVars.trailingSpace,
  },
});

type IComboboxOption = React.ReactElement<IComboboxOptionProps>;
const isOption = (element: React.ReactElement): element is IComboboxOption =>
  !!ComboboxOption.displayName &&
  isElementLike<IComboboxOption>(element, ComboboxOption.displayName);

const emptyArrayStableRef: Array<string> = [];

const getMatchingOptions = (
  options: Array<IComboboxOption>,
  values: string | Array<string>,
): Array<IOption | string> =>
  asArray(values).map(
    (value) =>
      options.find((option) => option && option.props.value === value) ?? value,
  );

const defaultFilter = createFilter<IOption>();

const emptyOption: IComboboxOption = (
  <ComboboxOption key='__empty' value=''>
    —
  </ComboboxOption>
);

const optionNodeToLabel = (option: IOption | string): string =>
  typeof option === 'string'
    ? option
    : option.props.label ??
      (option.props.children
        ? reactNodeToString(option.props.children)
        : undefined) ??
      option.props.value;

const ComboboxBase = forwardRef<HTMLDivElement, IComboboxBaseProps>(
  function Combobox(props, ref) {
    const {
      sx,
      children,
      visualState: visualStateProp,
      onChange,
      disabled,
      defaultValue,
      value: valueProp,
      multiple,
      filter = defaultFilter,
      noOptionsText = 'No options',
      createOptionText = (query) => `Create "${query}"`,
      allowCustomValues,
      limit,
      moreOption,
      selectOnFocus,
      nullable: nullableProp,
      ...other
    } = props;

    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: defaultValue ?? (multiple ? emptyArrayStableRef : null),
      name: 'ComboboxBase',
    });
    const { refs, floatingStyles } = useFloating({
      placement: 'bottom-start',
      middleware: [
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });
    const { root } = useColorScheme();

    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const [query, setQuery] = useState<string>('');

    const handleChange = (newValue: (typeof props)['value']): void => {
      setValue(newValue);

      // TODO: check array equality?
      if (value !== newValue) {
        onChange?.(newValue as string & Array<string>);
      }
    };

    const openVisualState: IVisualState = { focused: true };

    // In a MultiCombobox, options are toggled on and off, resulting in an
    // empty array (rather than null) if nothing is selected.
    const nullable = multiple ? undefined : nullableProp;

    const childrenOptions = Children.toArray(children)
      .filter(isValidElement)
      .filter(isOption);
    const options = nullable
      ? [emptyOption, ...childrenOptions]
      : childrenOptions;
    const filteredOptions = query
      ? filter(options, {
          query,
          getSearchableText: (option) =>
            [optionNodeToLabel(option), option.props.searchableText].flat(),
        })
      : undefined;
    const presentedOptions = filteredOptions ?? options;
    const hasValue = Array.isArray(value) ? !!value.length : !!value?.length;

    const lastCloseActionRef = useRef<number>(0);

    const deleteValue = (valueToDelete: string): void => {
      const updatedValues = Array.isArray(value)
        ? value.filter((v) => v !== valueToDelete)
        : value;
      setValue(updatedValues);
      onChange?.(updatedValues as string & Array<string>);
    };

    // In a MultiCombobox, the user can unselect a selected option by
    // clicking on the delete action of its chip.
    // In a Combobox, there is no chip, and no delete action to handle.
    const handleDelete = (
      event: React.MouseEvent<HTMLElement>,
      value: string,
    ): void => {
      event.preventDefault();

      deleteValue(value);
    };

    // In a MultiCombobox, the user can unselect the last selected option
    // when the query is empty by pressing the backspace key.
    // In a Combobox, there is no chip, and no delete action to handle.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key === 'Backspace') {
        if (!query) {
          // Delete last value
          const lastValue = asArray(value).slice(-1)[0];
          if (lastValue) {
            deleteValue(lastValue);
          }
        }
      }
    };

    const hasMore = limit && limit < presentedOptions.length;
    const visibleOptions = hasMore
      ? presentedOptions.slice(0, limit)
      : presentedOptions;

    const matchingOptions =
      value !== null && value !== undefined
        ? getMatchingOptions(options, value)
        : [];

    // In a MultiCombobox, the input value is always the query. Once the
    // user selects an option, the query is cleared.
    // In a Combobox, the input value is managed by the Combobox. Check the
    // Combobox.Input component to see how `displayValue` is managed.

    const matchingOption = matchingOptions[0];
    const displayValue =
      (multiple
        ? undefined
        : (matchingOption ? optionNodeToLabel(matchingOption) : undefined) ??
          (value as string)) ?? '';

    // Make sure app list always contains the current value.
    if (!multiple && !query && !!value) {
      const valueAsString = value as string;
      const isCurrentOptionVisible = visibleOptions.some(
        (option) => option.props.value === valueAsString,
      );

      if (!isCurrentOptionVisible) {
        const currentOption = matchingOptions[0];
        if (currentOption) {
          const extraOption =
            typeof currentOption === 'string' ? (
              <ComboboxOption key={valueAsString} value={valueAsString}>
                {currentOption}
              </ComboboxOption>
            ) : (
              currentOption
            );

          if (hasMore) {
            visibleOptions.splice(visibleOptions.length - 1, 1, extraOption);
          } else {
            visibleOptions.push(extraOption);
          }
        }
      }
    }

    const renderMoreOption = (): React.ReactNode =>
      typeof moreOption === 'function'
        ? moreOption({
            total: options.length,
            hidden: options.length - visibleOptions.length,
          })
        : moreOption;

    const handleFocus = (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      open: boolean,
    ): void => {
      if (!open) {
        if (
          lastCloseActionRef.current <
          Date.now() - MIN_DELAY_BETWEEN_CLOSE_AND_OPEN
        ) {
          toggleButtonRef.current?.click();
        }

        if (selectOnFocus) {
          event.target.select();
        }
      }
    };

    return (
      <Autocomplete
        {...stylex.props(styles.host, disabled && styles.host$disabled, sx)}
        ref={ref}
        as='div'
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        // @ts-expect-error Combobox type is too restrictive for dynamic
        // properties.
        nullable={nullable}
        // @ts-expect-error Combobox type is too restrictive for dynamic
        // properties.
        multiple={multiple}
      >
        {({ open }) => (
          <>
            <Autocomplete.Input as={Fragment} displayValue={() => displayValue}>
              {() => {
                const TrailingIcon = open ? TriangleUpIcon : TriangleDownIcon;
                const visualState = open
                  ? {
                      ...visualStateProp,
                      ...openVisualState,
                    }
                  : visualStateProp;

                return (
                  <TextField
                    {...other}
                    containerRef={refs.setReference}
                    innerStyles={{ field: fieldStyles }}
                    visualState={visualState}
                    end={
                      <Autocomplete.Button
                        ref={toggleButtonRef}
                        as={IconButton}
                        onClick={() => {
                          if (open) {
                            lastCloseActionRef.current = Date.now();
                          }
                        }}
                        icon={<TrailingIcon height='6' />}
                      />
                    }
                    autoComplete='off'
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={(event) => handleFocus(event, open)}
                    onBlur={() => setQuery('')}
                    onKeyDown={multiple ? handleKeyDown : undefined}
                    populated={hasValue}
                  >
                    {multiple && value && hasValue
                      ? getMatchingOptions(options, value).map(
                          (option, index) =>
                            typeof option === 'string' ? (
                              <InputChip
                                key={index}
                                label={option}
                                onDelete={
                                  multiple
                                    ? (event) => handleDelete(event, option)
                                    : undefined
                                }
                                data-cy={`chip-${option}`}
                              />
                            ) : (
                              <InputChip
                                key={index}
                                label={optionNodeToLabel(option)}
                                onDelete={
                                  multiple
                                    ? (event) =>
                                        handleDelete(event, option.props.value)
                                    : undefined
                                }
                                icon={option.props.leadingIcon}
                                data-cy={`chip-${option.props.value}`}
                              />
                            ),
                        )
                      : null}
                  </TextField>
                );
              }}
            </Autocomplete.Input>

            {open ? (
              <FloatingPortal root={root}>
                <Transition as={Fragment} afterLeave={() => setQuery('')}>
                  <Autocomplete.Options
                    {...stylex.props(styles.options)}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    static
                    data-cy='options'
                  >
                    <MenuList sx={styles.menuList}>
                      {visibleOptions?.length ? (
                        visibleOptions
                      ) : allowCustomValues ? (
                        <ComboboxOption value={query}>
                          {createOptionText(query)}
                        </ComboboxOption>
                      ) : (
                        <ListItem disabled data-cy='no-options'>
                          {noOptionsText}
                        </ListItem>
                      )}
                      {hasMore ? (
                        <>
                          <MenuListDivider />
                          {renderMoreOption()}
                        </>
                      ) : null}
                    </MenuList>
                  </Autocomplete.Options>
                </Transition>
              </FloatingPortal>
            ) : null}
          </>
        )}
      </Autocomplete>
    );
  },
);

const ComboboxBaseNamespace = Object.assign(ComboboxBase, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { ComboboxBaseNamespace as ComboboxBase };
