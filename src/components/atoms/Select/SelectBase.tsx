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
import { InputChip } from '@/components/atoms/Chip';
import { useControlled } from '@/hooks/useControlled';

type IOption = React.ReactElement<ISelectOptionProps>;

export type ISelectBaseProps = Omit<
  IFieldProps,
  'end' | 'value' | 'defaultValue'
> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode> | null;
  id?: string;
} & (
    | {
        multiple: false;
        value?: string | null;
        defaultValue?: string;
        onChange?: (value: string | null) => void;
        renderOption?: (
          option: IOption,
          onDelete: (value: string) => void,
        ) => React.ReactNode;
        limit?: number;
        moreOption?:
          | React.ReactNode
          | ((props: { total: number; hidden: number }) => React.ReactNode);
      }
    | {
        multiple: true;
        value?: Array<string>;
        defaultValue?: Array<string>;
        onChange?: (value: Array<string>) => void;
        renderOption?: (
          options: Array<IOption>,
          onDelete: (value: string) => void,
        ) => React.ReactNode;
        limit?: undefined;
        moreOption?: undefined;
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
  menuList: {
    maxHeight: 300,
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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

const optionNodeToLabel = (option: IOption | string): React.ReactNode =>
  typeof option === 'string'
    ? option
    : option.props.label ?? option.props.children ?? option.props.value;

const defaultRenderSingleOption = (
  options: IOption | Array<IOption>,
): React.ReactNode => asArray(options).map(optionNodeToLabel).join(', ');

const defaultRenderMultiOptions = (
  options: IOption | Array<IOption>,
  onDelete: (value: string) => void,
): React.ReactNode => {
  const optionsArray = asArray(options);

  return optionsArray.length ? (
    <div {...stylex.props(styles.chips)}>
      {optionsArray.map((option, index) => (
        <InputChip
          key={index}
          label={optionNodeToLabel(option)}
          onDelete={(event) => {
            event.preventDefault();
            onDelete(option.props.value);
          }}
          icon={option.props.leadingIcon}
        />
      ))}
    </div>
  ) : null;
};

const emptyArrayStableRef: Array<string> = [];

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
      value: valueProp,
      multiple,
      renderOption = multiple
        ? defaultRenderMultiOptions
        : defaultRenderSingleOption,
      limit,
      moreOption,
      ...other
    } = props;

    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: defaultValue ?? (multiple ? emptyArrayStableRef : null),
      name: 'SelectBase',
    });

    const handleChange = (value: (typeof props)['value']): void => {
      setValue(value);
      onChange?.(value as string & Array<string>);
    };

    const deleteValue = (valueToDelete: string): void => {
      const updatedValues = Array.isArray(value)
        ? value.filter((v) => v !== valueToDelete)
        : value;
      setValue(updatedValues);
      onChange?.(updatedValues as string & Array<string>);
    };

    const openVisualState: IVisualState = { focused: true };

    const options = Children.toArray(children);

    // TODO: only take in consideration Select.Option children
    const hasMore = limit && limit < options.length;
    const visibleOptions = hasMore ? options.slice(0, limit) : options;

    const renderMoreOption = (): React.ReactNode =>
      typeof moreOption === 'function'
        ? moreOption({
            total: options.length,
            hidden: options.length - visibleOptions.length,
          })
        : moreOption;

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
              ? renderOption(
                  optionsToRender as IOption & Array<IOption>,
                  deleteValue,
                )
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
          <MenuList {...stylex.props(styles.menuList)}>
            {visibleOptions}
            {hasMore ? (
              <>
                <MenuListDivider />
                {renderMoreOption()}
              </>
            ) : null}
          </MenuList>
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
