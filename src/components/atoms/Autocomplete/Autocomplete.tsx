import stylex from '@stylexjs/stylex';
import {
  Fragment,
  forwardRef,
  useState,
  Children,
  isValidElement,
} from 'react';
import { Combobox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { IconButton } from '@/components/atoms/IconButton';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { AutocompleteOption } from './AutocompleteOption';

// TODO: allowEmpty
// https://headlessui.com/react/combobox#allowing-empty-values

// TODO: customFilter

// TODO: value when filtered elements are empty

// TODO: open on focus

// TODO: allow custom values
// https://headlessui.com/react/combobox#allowing-custom-values

// TODO: allow multiple values
// https://headlessui.com/react/combobox#allowing-custom-values

export type IAutocompleteProps = Omit<
  ITextFieldProps,
  'onChange' | 'end' | 'value' | 'id'
> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode> | React.ReactNode;
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
};

type IChildCompatibleProps = {
  value?: string;
  displayValue?: string;
};

const styles = stylex.create({
  host: {
    position: 'relative',
    cursor: 'pointer',
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
      ...other
    } = props;

    const [value, setValue] = useState(valueProp ?? '');
    const [query, setQuery] = useState<string | undefined>(undefined);

    const getCurrentDisplayValueForValue = (value: string): string => {
      const compatibleProps = (
        Children.toArray(children).find((child) => {
          const childValue = isValidElement(child)
            ? (child as React.ReactElement<IChildCompatibleProps>).props.value
            : undefined;
          const isMatching = childValue !== undefined && childValue === value;

          return isMatching;
        }) as React.ReactElement<IChildCompatibleProps> | undefined
      )?.props;

      return compatibleProps?.displayValue ?? value;
    };

    const handleChange = (value: string): void => {
      setValue(value);
      setQuery(undefined);
      onChange?.(value);
    };

    const openVisualState: IVisualState = { focused: true };

    const filteredOptions = Children.toArray(children).filter((child) => {
      const childValue = isValidElement(child)
        ? (child as React.ReactElement<IChildCompatibleProps>).props.value
        : undefined;
      const isMatching =
        !query || childValue?.toLowerCase().includes(query.toLowerCase());

      return isMatching;
    });

    return (
      <Combobox
        {...stylex.props(styles.host, disabled && styles.host$disabled, sx)}
        ref={ref}
        as='div'
        id={id}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      >
        <Combobox.Input
          as={Fragment}
          displayValue={(value: string) =>
            getCurrentDisplayValueForValue(value)
          }
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
                  as={IconButton}
                  icon={
                    open ? (
                      <TriangleUpIcon height='6' />
                    ) : (
                      <TriangleDownIcon height='6' />
                    )
                  }
                />
              }
              value={
                query ?? (value ? getCurrentDisplayValueForValue(value) : '')
              }
              onChange={(event) => setQuery(event.target.value)}
              autoComplete='off'
              {...other}
            />
          )}
        </Combobox.Input>
        <Combobox.Options {...stylex.props(styles.options)}>
          <MenuList>{filteredOptions}</MenuList>
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
