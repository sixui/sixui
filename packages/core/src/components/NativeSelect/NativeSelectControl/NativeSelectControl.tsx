import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { INativeSelectControlThemeFactory } from './NativeSelectControl.css';
import type {
  INativeSelectControlFactory,
  INativeSelectControlOption,
} from './NativeSelectControl.types';
import { iconTriangleDown } from '~/assets/icons';
import { FieldBase, FieldBaseSkeleton } from '~/components/FieldBase';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './NativeSelectControl.constants';
import { nativeSelectControlTheme } from './NativeSelectControl.css';

export const NativeSelectControl =
  componentFactory<INativeSelectControlFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      items,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const id = other.id ?? labeledContext?.id;
    const disabled = other.disabled ?? labeledContext?.disabled;
    const readOnly = other.readOnly ?? labeledContext?.readOnly;
    const required = other.required ?? labeledContext?.required;

    const { getStyles } = useComponentTheme<INativeSelectControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: nativeSelectControlTheme,
    });

    const selectRef = useRef<HTMLSelectElement | null>(null);
    const selectHandleRef = useMergeRefs(selectRef, forwardedRef);

    const [focused, setFocused] = useState(false);
    const focus = useFocus({
      onFocusChange: setFocused,
    });

    // Focus the input when the user clicks on the field.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (focused) {
        return;
      }

      const isInput = event.target === selectRef.current;
      if (!isInput) {
        event.stopPropagation();
        selectRef.current?.focus();
        selectRef.current?.click();
      }
    };

    return (
      <FieldBase<'select'>
        {...other}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={mergeClassNames(classNames, {
          section$start: getStyles('section$start').className,
          section$end: getStyles('section$end').className,
        })}
        interactions={{ focused, ...other.interactions }}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        trailingIcon={<SvgIcon icon={iconTriangleDown} />}
        forwardForeignProps
        managedFocus
      >
        {({ foreignProps }) => (
          <>
            {children}

            <select
              {...mergeProps(focus.focusProps, foreignProps)}
              {...getStyles('select')}
              id={id}
              disabled={disabled}
              required={required}
              multiple={false}
              ref={selectHandleRef}
            >
              {items.map((option) => {
                const optionProps: INativeSelectControlOption =
                  typeof option === 'object' ? option : { value: option };

                return (
                  <option {...optionProps} key={optionProps.value}>
                    {optionProps.label?.length
                      ? optionProps.label
                      : optionProps.value}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </FieldBase>
    );
  });

NativeSelectControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
NativeSelectControl.theme = nativeSelectControlTheme;
NativeSelectControl.Skeleton = FieldBaseSkeleton;
