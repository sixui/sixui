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
import { asArray, filterUndefineds } from '@olivierpascal/helpers';

import { createFilter, type IFilter } from '@/helpers/createFilter';
import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { IconButton } from '@/components/atoms/IconButton';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { getDisplayName } from '@/helpers/react/getDisplayName';
import { reactNodeToString } from '@/helpers/react/nodeToString';
import { componentVars as textFieldVars } from '@/themes/base/TextField/TextField.stylex';
import { ComboboxOption, type IComboboxOptionProps } from './ComboboxOption';
import { InputChip } from '@/components/atoms/Chip';
import { useControlled } from '@/hooks/useControlled';

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
    width: 'fit-content',
  },
  host$disabled: {
    cursor: 'default',
  },
  options: {
    position: 'absolute',
    width: '100%',
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
    paddingInlineEnd: textFieldVars.trailingSpace,
  },
});

const getValidOption = (child: React.ReactNode): IOption | undefined => {
  const childDisplayName = isValidElement(child)
    ? getDisplayName(child)
    : undefined;
  const isCompatibleOption = childDisplayName === ComboboxOption.displayName;
  const option = isCompatibleOption ? (child as IOption) : undefined;

  return option;
};

const emptyArrayStableRef: Array<string> = [];

const getMatchingOptions = (
  children: Array<React.ReactNode> | undefined | null,
  values: string | Array<string>,
): Array<IOption | string> =>
  filterUndefineds(
    asArray(values).map(
      (value) =>
        Children.toArray(children)
          .map(getValidOption)
          .find((option) => option && option.props.value === value) ?? value,
    ),
  );

const defaultFilter = createFilter<IOption>();

const optionNodeToLabel = (option: IOption | string): string =>
  typeof option === 'string'
    ? option
    : option.props.label ??
      reactNodeToString(option.props.children) ??
      option.props.value;

const ComboboxBase = forwardRef<HTMLDivElement, IComboboxBaseProps>(
  function Combobox(props, ref) {
    const {
      sx,
      children,
      visualState: visualStateProp,
      id,
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

    const options = Children.toArray(children);
    const validOptions = filterUndefineds(options.map(getValidOption));
    const filteredOptions = query
      ? filter(validOptions, {
          query,
          getSearchableText: (option) =>
            [optionNodeToLabel(option), option.props.searchableText].flat(),
        })
      : undefined;
    const presentedOptions = filteredOptions ?? options;
    const hasValue = Array.isArray(value) ? !!value.length : !!value?.length;

    const lastCloseActionRef = useRef<number>(0);

    // In a MultiCombobox, options are toggled on and off, resulting in an
    // empty array (rather than null) if nothing is selected.
    const nullable = multiple ? undefined : nullableProp;

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

    // TODO: only take in consideration Combobox.Option children
    const hasMore = limit && limit < presentedOptions.length;
    const visibleOptions = hasMore
      ? presentedOptions.slice(0, limit)
      : presentedOptions;

    const matchingOptions = value ? getMatchingOptions(children, value) : [];

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
      const isCurrentOptionVisible = filterUndefineds(
        visibleOptions.map(getValidOption),
      ).some((option) => option.props.value === valueAsString);

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
        id={id}
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
                    onKeyDown={multiple ? handleKeyDown : undefined}
                    populated={hasValue}
                  >
                    {multiple && value && hasValue
                      ? getMatchingOptions(children, value).map(
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
                              />
                            ),
                        )
                      : null}
                  </TextField>
                );
              }}
            </Autocomplete.Input>

            <Transition as={Fragment} afterLeave={() => setQuery('')}>
              <Autocomplete.Options {...stylex.props(styles.options)}>
                <MenuList sx={styles.menuList}>
                  {visibleOptions?.length === 0 && !!query ? (
                    allowCustomValues ? (
                      <ComboboxOption value={query}>
                        {createOptionText(query)}
                      </ComboboxOption>
                    ) : (
                      <ListItem disabled>{noOptionsText}</ListItem>
                    )
                  ) : (
                    visibleOptions
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
