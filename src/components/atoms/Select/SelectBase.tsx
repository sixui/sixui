import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef, Children, isValidElement } from 'react';
import { Listbox } from '@headlessui/react';
import { asArray } from '@olivierpascal/helpers';
import { useFloating } from '@floating-ui/react-dom';
import { size } from '@floating-ui/dom';
import { FloatingPortal } from '@floating-ui/react';

import type { IOmit } from '@/helpers/types';
import { MenuList } from '@/components/atoms/MenuList';
import { IVisualState } from '@/hooks/useVisualState';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { Field, type IFieldProps } from '@/components/atoms/Field';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { InputChip } from '@/components/atoms/Chip';
import { useControlledValue } from '@/hooks/useControlledValue';
import { isElementLike } from '@/helpers/react/isElementLike';
import { SelectOption, type ISelectOptionProps } from './SelectOption';

type IOption = React.ReactElement<ISelectOptionProps>;

export type ISelectBaseProps = IOmit<IFieldProps, 'children' | 'end'> & {
  visualState?: IVisualState;
  children?: Array<React.ReactNode> | null;
  noOptionsText?: string;
  id?: string;
} & (
    | {
        multiple: false;
        value?: string | null;
        defaultValue?: string;
        onChange?: (value: string) => void;
        renderOption?: (
          option: string | IOption | Array<string | IOption>,
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
          option: string | IOption | Array<string | IOption>,
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
    display: 'flex',
    flexGrow: 1,
  },
  host$disabled: {
    cursor: 'default',
  },
  menuList: {
    maxHeight: 320,
  },
  options: {
    zIndex: 999,
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

type ISelectOption = React.ReactElement<ISelectOptionProps>;
const isOption = (element: React.ReactElement): element is ISelectOption =>
  !!SelectOption.displayName &&
  isElementLike<ISelectOption>(element, SelectOption.displayName);

const getMatchingOptions = (
  children: Array<React.ReactNode> | undefined | null,
  values: string | Array<string>,
): Array<IOption | string> =>
  asArray(values).map(
    (value) =>
      Children.toArray(children)
        .filter(isValidElement)
        .filter(isOption)
        .find((option) => option.props.value === value) ?? value,
  );

const optionNodeToLabel = (option: IOption | string): React.ReactNode =>
  typeof option === 'string'
    ? option
    : option.props.label ?? option.props.children ?? option.props.value;

const defaultRenderSingleOption = (
  options: IOption | string | Array<IOption | string>,
): React.ReactNode => asArray(options).map(optionNodeToLabel).join(', ');

const defaultRenderMultiOptions = (
  options: IOption | string | Array<IOption | string>,
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
            if (typeof option === 'string') {
              onDelete(option);
            } else if (option.props.value) {
              onDelete(option.props.value);
            }
          }}
          icon={
            typeof option === 'string' ? undefined : option.props.leadingIcon
          }
          data-cy={
            typeof option === 'string'
              ? `chip-${option}`
              : `chip-${option.props.value}`
          }
        />
      ))}
    </div>
  ) : null;
};

const emptyArrayStableRef: Array<string> = [];

const SelectBase = forwardRef<HTMLDivElement, ISelectBaseProps>(
  function SelectBase(props, forwardedRef) {
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
      noOptionsText = 'No options',
      renderOption = multiple
        ? defaultRenderMultiOptions
        : defaultRenderSingleOption,
      limit,
      moreOption,
      ...other
    } = props;

    const [value, setValue] = useControlledValue({
      controlled: valueProp,
      default: defaultValue ?? (multiple ? emptyArrayStableRef : null),
      name: 'SelectBase',
    });
    const { refs, floatingStyles } = useFloating({
      placement: 'bottom-start',
      middleware: [
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });
    const { root } = useColorScheme();

    const handleChange = (newValue: (typeof props)['value']): void => {
      setValue(newValue);
      onChange?.(newValue as string & Array<string>);
    };

    const deleteValue = (valueToDelete: string): void => {
      const updatedValues = Array.isArray(value)
        ? value.filter((v) => v !== valueToDelete)
        : value;
      setValue(updatedValues);
      onChange?.(updatedValues as string & Array<string>);
    };

    const openVisualState: IVisualState = { focused: true };

    const options = Children.toArray(children)
      .filter(isValidElement)
      .filter(isOption);

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
        ref={forwardedRef}
        as='div'
        id={id}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        multiple={multiple}
        defaultValue={defaultValue}
      >
        {({ open }) => (
          <>
            <Listbox.Button as={Fragment}>
              {({
                open,
                value,
              }: {
                open: boolean;
                value: (typeof props)['value'];
              }) => {
                const matchingOptions =
                  value !== null && value !== undefined
                    ? getMatchingOptions(children, value)
                    : [];
                const matchingOption =
                  multiple || !matchingOptions.length
                    ? undefined
                    : matchingOptions[0];
                const optionsToRender = multiple
                  ? matchingOptions
                  : matchingOption;
                const displayValue = optionsToRender
                  ? renderOption(optionsToRender, deleteValue)
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
                    ref={refs.setReference}
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
                    end={<TrailingIcon />}
                  >
                    {displayValue}
                  </Field>
                );
              }}
            </Listbox.Button>

            {open ? (
              <FloatingPortal root={root}>
                <Listbox.Options
                  {...stylex.props(styles.options)}
                  ref={refs.setFloating}
                  style={floatingStyles}
                  static
                  data-cy='selectOptions'
                >
                  <MenuList sx={styles.menuList}>
                    {visibleOptions?.length ? (
                      <>
                        {visibleOptions}
                        {hasMore ? (
                          <>
                            <MenuListDivider />
                            {renderMoreOption()}
                          </>
                        ) : null}
                      </>
                    ) : (
                      <ListItem disabled data-cy='no-options'>
                        {noOptionsText}
                      </ListItem>
                    )}
                  </MenuList>
                </Listbox.Options>
              </FloatingPortal>
            ) : null}
          </>
        )}
      </Listbox>
    );
  },
);

const SelectBaseNamespace = Object.assign(SelectBase, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectBaseNamespace as SelectBase };
