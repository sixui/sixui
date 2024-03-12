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
import { AutocompleteOption } from './AutocompleteOption';

export type IAutocompleteProps = Omit<
  ITextFieldProps,
  'onChange' | 'end' | 'value' | 'id'
> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode> | React.ReactNode;
  id?: string;
  onChange?: (value: string | null) => void;
  value?: string;
  filter?: IFilter<Exclude<React.ReactNode, boolean | null | undefined>>;
  noOptionsText?: string;
  createOptionText?: (query: string) => string;
  allowCustomValues?: boolean;
};

type ICompatibleOptionProps = {
  value?: string;
  displayValue?: string;
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

const defaultFilter =
  createFilter<Exclude<React.ReactNode, boolean | null | undefined>>();

const Autocomplete = forwardRef<HTMLElement, IAutocompleteProps>(
  function Autocomplete(props, ref) {
    const {
      sx,
      children,
      visualState: visualStateProp,
      id,
      onChange,
      disabled,
      value: valueProp,
      filter = defaultFilter,
      noOptionsText = 'No options',
      createOptionText = (query) => `Create "${query}"`,
      allowCustomValues,
      ...other
    } = props;

    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const [value, setValue] = useState<string | null>(valueProp ?? null);
    const [query, setQuery] = useState<string | undefined>(undefined);

    const getDisplayValueForOption = (
      option: React.ReactElement<ICompatibleOptionProps>,
    ): string | undefined => option.props.displayValue ?? option.props.value;

    const getDisplayValueForValue = (value: string): string => {
      const matchingOption = Children.toArray(children).find((child) => {
        const childValue = isValidElement(child)
          ? (child as React.ReactElement<ICompatibleOptionProps>).props.value
          : undefined;
        const isMatching = childValue !== undefined && childValue === value;

        return isMatching;
      }) as React.ReactElement<ICompatibleOptionProps> | undefined;

      return (
        (matchingOption
          ? getDisplayValueForOption(matchingOption)
          : undefined) ?? value
      );
    };

    const handleChange = (value: string | null): void => {
      setValue(value);
      onChange?.(value);

      // Use setTimeout to clear the query in the next tick, to avoid flickering
      // when clicking on an option.
      setTimeout(() => setQuery(undefined));
    };

    const openVisualState: IVisualState = { focused: true };

    const options = Children.toArray(children);
    const filteredOptions = query
      ? filter(options, {
          query,
          getItemLabel: (item) =>
            isValidElement(item)
              ? (item as React.ReactElement<ICompatibleOptionProps>).props
                  .displayValue
              : undefined,
        })
      : options;

    const lastCloseActionRef = useRef<number>(0);
    const minDelayBetweenCloseAndOpen = 300;

    return (
      <Combobox
        {...stylex.props(styles.host, disabled && styles.host$disabled, sx)}
        ref={ref}
        as='div'
        id={id}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        nullable
      >
        <Combobox.Input
          as={Fragment}
          displayValue={(value: string) => getDisplayValueForValue(value)}
        >
          {({ open }) => (
            <TextField
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
                      Date.now() - minDelayBetweenCloseAndOpen
                    ? toggleButtonRef.current?.click()
                    : undefined
              }
              {...other}
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
  },
);

const AutocompleteNamespace = Object.assign(Autocomplete, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { AutocompleteNamespace as Autocomplete };
