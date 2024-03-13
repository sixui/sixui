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

import { createFilter, type IFilter } from '@/helpers/createFilter';
import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { IconButton } from '@/components/atoms/IconButton';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { getComponentDisplayName } from '@/helpers/getComponentDisplayName';
import { reactNodeToString } from '@/helpers/reactNodeToString';
import {
  AutocompleteOption,
  type IAutocompleteOptionProps,
} from './AutocompleteOption';

const MIN_DELAY_BETWEEN_CLOSE_AND_OPEN = 300;

type IAutocompleteOption = React.ReactElement<IAutocompleteOptionProps>;

export type IAutocompleteBaseProps<TValue> = Omit<
  ITextFieldProps,
  'onChange' | 'end' | 'value' | 'defaultValue' | 'id'
> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode> | React.ReactNode;
  id?: string;
  onChange?: (value: TValue) => void;
  value?: TValue;
  defaultValue?: TValue;
  filter?: IFilter<Exclude<React.ReactNode, boolean | null | undefined>>;
  noOptionsText?: string;
  createOptionText?: (query: string) => string;
  allowCustomValues?: boolean;
};

export type IAutocompleteSingleBaseProps = IAutocompleteBaseProps<string> & {
  multiple: false;
  renderOption?: (option: IAutocompleteOption) => string | undefined;
};

export type IAutocompleteMultipleBaseProps = IAutocompleteBaseProps<
  Array<string>
> & {
  multiple: true;
  renderOption?: (options: Array<IAutocompleteOption>) => string | undefined;
};

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

const getValidOption = (
  child: React.ReactNode,
): IAutocompleteOption | undefined => {
  const childDisplayName = isValidElement(child)
    ? getComponentDisplayName(child)
    : undefined;
  const isCompatibleOption =
    childDisplayName === AutocompleteOption.displayName;
  const option = isCompatibleOption
    ? (child as IAutocompleteOption)
    : undefined;

  return option;
};

const getMatchingOptions = (
  children: Array<React.ReactNode> | React.ReactNode,
  value: string | Array<string>,
): Array<IAutocompleteOption> =>
  Children.toArray(children)
    .map(getValidOption)
    .filter((option) => {
      const isMatching =
        option &&
        ((typeof value === 'string' && option.props.value === value) ||
          value.includes(option.props.value));

      return isMatching;
    }) as Array<IAutocompleteOption>;

const defaultFilter =
  createFilter<Exclude<React.ReactNode, boolean | null | undefined>>();

const defaultRenderOption = (
  options: IAutocompleteOption | Array<IAutocompleteOption>,
): string | undefined =>
  reactNodeToString(
    Array.isArray(options)
      ? options.map((option) => option.props.children).join(', ')
      : options.props.children,
  );

const AutocompleteBase = forwardRef<
  HTMLDivElement,
  IAutocompleteSingleBaseProps | IAutocompleteMultipleBaseProps
>(function Autocomplete(props, ref) {
  const {
    sx,
    children,
    visualState: visualStateProp,
    id,
    onChange,
    disabled,
    defaultValue,
    value,
    multiple,
    renderOption = defaultRenderOption,
    filter = defaultFilter,
    noOptionsText = 'No options',
    createOptionText = (query) => `Create "${query}"`,
    allowCustomValues,
    ...other
  } = props;

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  // const [value, setValue] = useState<string | null>(valueProp ?? null); // FIXME
  const [query, setQuery] = useState<string | undefined>(undefined);

  const handleChange = (value: (typeof props)['value']): void => {
    // setValue(value); // FIXME
    onChange?.(value as string & Array<string>);

    // Use setTimeout to clear the query in the next tick, to avoid flickering
    // when clicking on an option.
    setTimeout(() => setQuery(undefined));
  };

  const openVisualState: IVisualState = { focused: true };

  const options = Children.toArray(children);
  const filteredOptions = query
    ? filter(options, {
        query,
        getItemLabel: (item) => reactNodeToString(item),
      })
    : options;

  const lastCloseActionRef = useRef<number>(0);

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
      nullable
      multiple={multiple}
    >
      <Combobox.Input
        as={Fragment}
        displayValue={(value: string) => {
          const matchingOptions = value
            ? getMatchingOptions(children, value)
            : [];
          const singleMatchingOption =
            multiple || !matchingOptions.length
              ? undefined
              : matchingOptions[0];
          const optionsToRender = multiple
            ? matchingOptions
            : singleMatchingOption;
          const displayValue = optionsToRender
            ? renderOption(
                optionsToRender as IAutocompleteOption &
                  Array<IAutocompleteOption>,
              )
            : undefined;

          return displayValue ?? value;
        }}
      >
        {({ open }) => (
          <TextField
            {...other}
            visualState={
              open
                ? {
                    ...visualStateProp,
                    ...openVisualState,
                  }
                : visualStateProp
            }
            end={
              <Combobox.Button
                ref={toggleButtonRef}
                as={IconButton}
                onClick={() => {
                  if (open) {
                    lastCloseActionRef.current = Date.now();
                  }
                }}
                icon={
                  open ? (
                    <TriangleUpIcon height='6' />
                  ) : (
                    <TriangleDownIcon height='6' />
                  )
                }
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
          />
        )}
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
});

const AutocompleteBaseNamespace = Object.assign(AutocompleteBase, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { AutocompleteBaseNamespace as AutocompleteBase };
