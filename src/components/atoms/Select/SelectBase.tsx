import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef, Children, isValidElement } from 'react';
import { Listbox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { getComponentDisplayName } from '@/helpers/getComponentDisplayName';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption, type ISelectOptionProps } from './SelectOption';

type ISelectOption = React.ReactElement<ISelectOptionProps>;

export type ISelectBaseProps<TValue> = Omit<
  IFieldProps,
  'end' | 'value' | 'defaultValue'
> & {
  visualState?: IVisualState;
  children: Array<React.ReactNode> | React.ReactNode;
  id?: string;
  onChange?: (value: TValue) => void;
  value?: TValue;
  defaultValue?: TValue;
};

export type ISelectSingleBaseProps = ISelectBaseProps<string> & {
  multiple: false;
  renderOption?: (option: ISelectOption) => React.ReactNode;
};

export type ISelectMultipleBaseProps = ISelectBaseProps<Array<string>> & {
  multiple: true;
  renderOption?: (options: Array<ISelectOption>) => React.ReactNode;
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

const getMatchingOptions = (
  children: Array<React.ReactNode> | React.ReactNode,
  value: string | Array<string>,
): Array<ISelectOption> =>
  Children.toArray(children)
    .map((child) => {
      const childDisplayName = isValidElement(child)
        ? getComponentDisplayName(child)
        : undefined;
      const isCompatibleOption = childDisplayName === SelectOption.displayName;
      const option = isCompatibleOption ? (child as ISelectOption) : undefined;

      return option;
    })
    .filter((option) => {
      const isMatching =
        option &&
        ((typeof value === 'string' && option.props.value === value) ||
          value.includes(option.props.value));

      return isMatching;
    }) as Array<ISelectOption>;

const defaultRenderOption = (
  options: ISelectOption | Array<ISelectOption>,
): React.ReactNode =>
  Array.isArray(options)
    ? options.map((option) => option.props.children).join(', ')
    : options.props.children;

const SelectBase = forwardRef<
  HTMLDivElement,
  ISelectSingleBaseProps | ISelectMultipleBaseProps
>(function SelectBase(props, ref) {
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
    ...other
  } = props;

  const handleChange = (value: (typeof props)['value']): void => {
    onChange?.(value as string & Array<string>);
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
      multiple={multiple}
      defaultValue={defaultValue}
    >
      <Listbox.Button as={Fragment}>
        {({
          open,
          value,
        }: {
          open: boolean;
          value: (typeof props)['value'];
        }) => {
          const matchingOptions = value
            ? getMatchingOptions(children, value)
            : [];
          const singleMatchingOption =
            multiple || !matchingOptions.length
              ? undefined
              : matchingOptions[0];
          const TrailingIcon = open ? TriangleUpIcon : TriangleDownIcon;
          const optionsToRender = multiple
            ? matchingOptions
            : singleMatchingOption;
          const displayValue = optionsToRender
            ? renderOption(
                optionsToRender as ISelectOption & Array<ISelectOption>,
              )
            : undefined;

          return (
            <Field
              {...other}
              tabIndex={0}
              visualState={
                open
                  ? {
                      ...visualStateProp,
                      ...openVisualState,
                    }
                  : visualStateProp
              }
              start={singleMatchingOption?.props.start}
              leadingIcon={singleMatchingOption?.props.leadingIcon}
              end={<TrailingIcon height='6' />}
              value={displayValue}
            />
          );
        }}
      </Listbox.Button>
      <Listbox.Options {...stylex.props(styles.options)}>
        <MenuList>{children}</MenuList>
      </Listbox.Options>
    </Listbox>
  );
});

const SelectBaseNamespace = Object.assign(SelectBase, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectBaseNamespace as SelectBase };
