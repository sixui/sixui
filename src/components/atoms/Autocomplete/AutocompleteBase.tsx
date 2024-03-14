import stylex from '@stylexjs/stylex';
import {
  Fragment,
  forwardRef,
  useState,
  Children,
  isValidElement,
  useRef,
} from 'react';
import { Combobox } from '@headlessui/react';
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
import {
  AutocompleteOption,
  type IAutocompleteOptionProps,
} from './AutocompleteOption';
import { InputChip } from '@/components/atoms/Chip';

const MIN_DELAY_BETWEEN_CLOSE_AND_OPEN = 300;

type IOption = React.ReactElement<IAutocompleteOptionProps>;

export type IAutocompleteBaseProps = Omit<
  ITextFieldProps,
  'onChange' | 'end' | 'value' | 'defaultValue' | 'id'
> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode>;
  id?: string;
  filter?: IFilter<IOption>;
  noOptionsText?: string;
  createOptionText?: (query: string) => string;
  allowCustomValues?: boolean;
} & (
    | {
        multiple: false;
        value?: string;
        defaultValue?: string;
        onChange?: (value: string) => void;
      }
    | {
        multiple: true;
        value?: Array<string>;
        defaultValue?: Array<string>;
        onChange?: (value: Array<string>) => void;
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
});

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
  const isCompatibleOption =
    childDisplayName === AutocompleteOption.displayName;
  const option = isCompatibleOption ? (child as IOption) : undefined;

  return option;
};

const getMatchingOptions = (
  children: Array<React.ReactNode> | undefined,
  values: string | Array<string>,
): Array<IOption | string> =>
  filterUndefineds(
    asArray(values).map(
      (value) =>
        Children.toArray(children)
          .map(getValidOption)
          .find((option) => {
            const isMatching =
              option &&
              ((typeof value === 'string' && option.props.value === value) ||
                value.includes(option.props.value));

            return isMatching;
          }) ?? value,
    ),
  );

const defaultFilter = createFilter<IOption>();

const optionNodeToLabel = (option: IOption | string): string =>
  typeof option === 'string'
    ? option
    : option.props.label ??
      reactNodeToString(option.props.children) ??
      option.props.value;

const AutocompleteBase = forwardRef<HTMLDivElement, IAutocompleteBaseProps>(
  function Autocomplete(props, ref) {
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
      ...other
    } = props;

    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const [value, setValue] = useState<(typeof props)['value']>(
      valueProp ?? defaultValue ?? (multiple ? [] : ''),
    );
    const [query, setQuery] = useState<string | undefined>(undefined);

    const handleChange = (value: (typeof props)['value']): void => {
      setValue(value);
      onChange?.(value as string & Array<string>);
      setQuery(undefined);
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
      : options;
    const isValueNotEmpty = Array.isArray(value)
      ? value.length
      : value !== undefined;

    const lastCloseActionRef = useRef<number>(0);

    // In a MultiAutocomplete, the input value is always the query. Once the
    // user selects an option, the query is cleared.
    // In a Autocomplete, the input value is managed by the Combobox. Check the
    // Combobox.Input component to see how `displayValue` is managed.
    const inputValue = multiple ? query ?? '' : undefined;

    // In a MultiAutocomplete, options are toggled on and off, resulting in an
    // empty array (rather than null) if nothing is selected.
    // In a Autocomplete, when no option is selected, the value is null.
    const nullable = multiple ? undefined : true;

    // In a MultiAutocomplete, the user can unselect a selected option by
    // clicking on the delete action of its chip.
    // In a Autocomplete, there is no chip, and no delete action to handle.
    const handleDelete = multiple
      ? (event: React.MouseEvent<HTMLElement>, value: string): void => {
          event.preventDefault();
          setValue((values) =>
            Array.isArray(values) ? values.filter((v) => v !== value) : values,
          );
        }
      : undefined;

    // In a MultiAutocomplete, the user can unselect the last selected option
    // when the query is empty by pressing the backspace key.
    // In a Autocomplete, there is no chip, and no delete action to handle.
    const handleKeyDown = multiple
      ? (event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === 'Backspace') {
            if (!query) {
              // delete last value
              setValue((values) =>
                Array.isArray(values)
                  ? values.slice(0, values.length - 1)
                  : values,
              );
            }
          }
        }
      : undefined;

    return (
      <Combobox
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
        <Combobox.Input
          as={Fragment}
          displayValue={
            multiple
              ? undefined
              : (value: string) => {
                  const matchingOptions = value
                    ? getMatchingOptions(children, value)
                    : [];
                  const matchingOption = matchingOptions[0];
                  const displayValue = matchingOption
                    ? optionNodeToLabel(matchingOption)
                    : undefined;

                  return displayValue ?? value;
                }
          }
        >
          {({ open }) => {
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
                  <Combobox.Button
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
                onFocus={() =>
                  open
                    ? undefined
                    : lastCloseActionRef.current <
                        Date.now() - MIN_DELAY_BETWEEN_CLOSE_AND_OPEN
                      ? toggleButtonRef.current?.click()
                      : undefined
                }
                value={inputValue}
                onKeyDown={handleKeyDown}
              >
                {multiple && value && isValueNotEmpty
                  ? getMatchingOptions(children, value).map((option, index) =>
                      typeof option === 'string' ? (
                        <InputChip
                          key={index}
                          label={option}
                          onDelete={
                            handleDelete
                              ? (event) => handleDelete(event, option)
                              : undefined
                          }
                        />
                      ) : (
                        <InputChip
                          key={index}
                          label={option.props.children}
                          onDelete={
                            handleDelete
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
        </Combobox.Input>

        <Combobox.Options {...stylex.props(styles.options)}>
          <MenuList>
            {filteredOptions?.length === 0 && !!query ? (
              allowCustomValues ? (
                <AutocompleteOption value={query}>
                  {createOptionText(query)}
                </AutocompleteOption>
              ) : (
                <ListItem disabled>{noOptionsText}</ListItem>
              )
            ) : (
              filteredOptions
            )}
          </MenuList>
        </Combobox.Options>
      </Combobox>
    );
  },
);

const AutocompleteBaseNamespace = Object.assign(AutocompleteBase, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { AutocompleteBaseNamespace as AutocompleteBase };
