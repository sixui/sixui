import stylex from '@stylexjs/stylex';
import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  useState,
} from 'react';
import { Listbox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption } from './SelectOption';

export type ISelectProps = Omit<IFieldProps, 'end' | 'value'> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode>;
  id?: string;
  onChange?: (value?: string) => void;
  value?: string;
  defaultValue?: string;
};

type IChildCompatibleProps = {
  value?: string;
  children?: React.ReactNode;
};

const styles = stylex.create({
  host: {
    position: 'relative',
    cursor: 'pointer',
    width: 'fit-content',
  },
  options: {
    position: 'absolute',
    width: '100%',
  },
});

const Select = forwardRef<HTMLElement, ISelectProps>(
  function Select(props, ref) {
    const {
      children,
      visualState: visualStateProp,
      id,
      onChange,
      defaultValue,
      value: valueProp,
      ...other
    } = props;

    const [value, setValue] = useState(defaultValue ?? valueProp);

    const handleChange = (value: string): void => {
      setValue(value);
      onChange?.(value);
    };

    const openVisualState: IVisualState = { focused: true };

    const currentChild = (
      Children.toArray(children).find(
        (child) =>
          isValidElement(child) &&
          (child as React.ReactElement<IChildCompatibleProps>).props.value ===
            value,
      ) as React.ReactElement<IChildCompatibleProps> | undefined
    )?.props.children;

    return (
      <Listbox
        ref={ref}
        as='div'
        {...stylex.props(styles.host)}
        id={id}
        onChange={handleChange}
        value={value}
      >
        <Listbox.Button as={Fragment}>
          {({ open }) => (
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
              value={currentChild}
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
});

export { SelectNamespace as Select };
