import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef } from 'react';
import { Listbox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption } from './SelectOption';

export type ISelectProps = Omit<IFieldProps, 'end'> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode>;
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
    const { children, visualState: visualStateProp, ...other } = props;

    const openVisualState: IVisualState = { focused: true };

    return (
      <Listbox ref={ref} as='div' {...stylex.props(styles.host)}>
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
