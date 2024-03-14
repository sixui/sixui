import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef, Children, isValidElement } from 'react';
import { Listbox } from '@headlessui/react';

import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { getDisplayName } from '@/helpers/react/getDisplayName';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { SelectOption, type ISelectOptionProps } from './SelectOption';
import { isFragment } from '@/helpers/react/isFragment';
import { isProduction } from '@/helpers/isProduction';

type ISelectOption = React.ReactElement<ISelectOptionProps>;

export type ISelectBaseProps = Omit<
  IFieldProps,
  'end' | 'value' | 'defaultValue'
> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode> | React.ReactNode;
  id?: string;
} & (
    | {
        multiple: false;
        value?: string;
        defaultValue?: string;
        onChange?: (value: string) => void;
        renderOption?: (option: ISelectOption) => React.ReactNode;
      }
    | {
        multiple: true;
        value?: Array<string>;
        defaultValue?: Array<string>;
        onChange?: (value: Array<string>) => void;
        renderOption?: (options: Array<ISelectOption>) => React.ReactNode;
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

const getValidOption = (child: React.ReactNode): ISelectOption | undefined => {
  const childDisplayName = isValidElement(child)
    ? getDisplayName(child)
    : undefined;
  const isCompatibleOption = childDisplayName === SelectOption.displayName;
  const option = isCompatibleOption ? (child as ISelectOption) : undefined;

  return option;
};

const getMatchingOptions = (
  children: Array<React.ReactNode> | React.ReactNode,
  value: string | Array<string>,
): Array<ISelectOption> =>
  Children.toArray(children)
    .map((child) => {
      if (!isProduction() && isFragment(child)) {
        // eslint-disable-next-line no-console
        console.error(
          "sixui: The Select component doesn't accept a Fragment as a child. Consider providing an array instead.",
        );
      }

      return getValidOption(child);
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
  (Array.isArray(options) ? options : [options])
    .map((option) => option.props.displayText ?? option.props.children)
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
  },
);

const SelectBaseNamespace = Object.assign(SelectBase, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectBaseNamespace as SelectBase };
