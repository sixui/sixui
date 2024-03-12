import stylex from '@stylexjs/stylex';
import {
  Fragment,
  forwardRef,
  useState,
  Children,
  isValidElement,
} from 'react';
import { Listbox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption } from './SelectOption';

export type ISelectProps = Omit<IFieldProps, 'end' | 'value'> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode> | React.ReactNode;
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
};

type ICompatibleOptionProps = {
  value?: string;
  displayValue?: string;
  children?: React.ReactNode;
};

// TODO: migrate in theme
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

const Select = forwardRef<HTMLElement, ISelectProps>(
  function Select(props, ref) {
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

    const getDisplayNodeForOption = (
      option: React.ReactElement<ICompatibleOptionProps>,
    ): React.ReactNode => option.props.displayValue ?? option.props.children;

    const getDisplayNodeForValue = (value: string): React.ReactNode => {
      const matchingOption = Children.toArray(children).find((child) => {
        const childValue = isValidElement(child)
          ? (child as React.ReactElement<ICompatibleOptionProps>).props.value
          : undefined;
        const isMatching = childValue !== undefined && childValue === value;

        return isMatching;
      }) as React.ReactElement<ICompatibleOptionProps> | undefined;

      return (
        (matchingOption
          ? getDisplayNodeForOption(matchingOption)
          : undefined) ?? value
      );
    };

    const handleChange = (value: string): void => {
      setValue(value);
      onChange?.(value);
    };

    const openVisualState: IVisualState = { focused: true };

    return (
      <Listbox
        {...stylex.props(styles.host, disabled && styles.host$disabled, sx)}
        ref={ref}
        as='div'
        id={id}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      >
        <Listbox.Button as={Fragment}>
          {({ open, value: uncontrolledValue }) => (
            <Field
              visualState={
                open
                  ? {
                      ...visualStateProp,
                      ...openVisualState,
                    }
                  : visualStateProp
              }
              end={
                open ? (
                  <TriangleUpIcon height='6' />
                ) : (
                  <TriangleDownIcon height='6' />
                )
              }
              value={getDisplayNodeForValue(
                value ?? (uncontrolledValue as string),
              )}
              {...other}
            />
          )}
        </Listbox.Button>
        <Listbox.Options {...stylex.props(styles.options)}>
          <MenuList>{children}</MenuList>
        </Listbox.Options>
      </Listbox>
    );
  },
);

const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectNamespace as Select };
