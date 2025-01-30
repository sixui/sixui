import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { IHtmlSelectThemeFactory } from './HtmlSelect.css';
import type { IHtmlSelectFactory, IHtmlSelectOption } from './HtmlSelect.types';
import { iconTriangleDown } from '~/assets/icons';
import { FieldBase } from '~/components/FieldBase';
import { useLabeledContext } from '~/components/Labeled';
import { SvgIcon } from '~/components/SvgIcon';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './HtmlSelect.constants';
import { htmlSelectTheme } from './HtmlSelect.css';

export const HtmlSelect = componentFactory<IHtmlSelectFactory>(
  (props, forwardedRef) => {
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

    const { getStyles } = useComponentTheme<IHtmlSelectThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: htmlSelectTheme,
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
        forwardProps
        managedFocus
      >
        {({ forwardedProps }) => (
          <>
            {children}

            <select
              {...mergeProps(focus.focusProps, forwardedProps)}
              {...getStyles('select')}
              id={id}
              disabled={disabled}
              required={required}
              multiple={false}
              ref={selectHandleRef}
            >
              {items.map((option) => {
                const optionProps: IHtmlSelectOption =
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
  },
);

HtmlSelect.theme = htmlSelectTheme;
HtmlSelect.displayName = `@sixui/${COMPONENT_NAME}`;
