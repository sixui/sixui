import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef, Children, isValidElement } from 'react';
import { Listbox } from '@headlessui/react';
import { asArray, filterUndefineds } from '@olivierpascal/helpers';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { getDisplayName } from '@/helpers/react/getDisplayName';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption, type ISelectOptionProps } from './SelectOption';

type IOption = React.ReactElement<ISelectOptionProps>;

export type ISelectBaseProps = Omit<
  IFieldProps,
  'end' | 'value' | 'defaultValue'
> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode>;
  id?: string;
} & (
    | {
        multiple: false;
        value?: string;
        defaultValue?: string;
        onChange?: (value: string) => void;
        renderOption?: (option: IOption) => React.ReactNode;
      }
    | {
        multiple: true;
        value?: Array<string>;
        defaultValue?: Array<string>;
        onChange?: (value: Array<string>) => void;
        renderOption?: (options: Array<IOption>) => React.ReactNode;
      }
  );

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

const getValidOption = (child: React.ReactNode): IOption | undefined => {
  const childDisplayName = isValidElement(child)
    ? getDisplayName(child)
    : undefined;
  const isCompatibleOption = childDisplayName === SelectOption.displayName;
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

const optionNodeToLabel = (option: IOption | string): React.ReactNode =>
  typeof option === 'string'
    ? option
    : option.props.label ?? option.props.children ?? option.props.value;

const defaultRenderOption = (
  options: IOption | Array<IOption>,
): React.ReactNode =>
  (Array.isArray(options) ? options : [options])
    .map(optionNodeToLabel)
    .join(', ');

const SelectBase = forwardRef<HTMLDivElement, ISelectBaseProps>(
  function SelectBase(props, ref) {
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
            const matchingOption =
              multiple || !matchingOptions.length
                ? undefined
                : matchingOptions[0];
            const optionsToRender = multiple ? matchingOptions : matchingOption;
            const displayValue = optionsToRender
              ? renderOption(optionsToRender as IOption & Array<IOption>)
              : undefined;

            const TrailingIcon = open ? TriangleUpIcon : TriangleDownIcon;
            const visualState = open
              ? {
                  ...visualStateProp,
                  ...openVisualState,
                }
              : visualStateProp;

            return (
              <Field
                {...other}
                tabIndex={0}
                visualState={visualState}
                start={
                  typeof matchingOption === 'string'
                    ? undefined
                    : matchingOption?.props.start
                }
                leadingIcon={
                  typeof matchingOption === 'string'
                    ? undefined
                    : matchingOption?.props.leadingIcon
                }
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
  },
);

const SelectBaseNamespace = Object.assign(SelectBase, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectBaseNamespace as SelectBase };
