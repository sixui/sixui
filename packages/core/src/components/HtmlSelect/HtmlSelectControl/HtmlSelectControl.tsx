import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { IHtmlSelectControlThemeFactory } from './HtmlSelectControl.css';
import type {
  IHtmlSelectControlFactory,
  IHtmlSelectControlOption,
} from './HtmlSelectControl.types';
import { iconTriangleDown } from '~/assets/icons';
import { FieldBase } from '~/components/FieldBase';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './HtmlSelectControl.constants';
import { htmlSelectControlTheme } from './HtmlSelectControl.css';

export const HtmlSelectControl = componentFactory<IHtmlSelectControlFactory>(
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

    const { getStyles } = useComponentTheme<IHtmlSelectControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: htmlSelectControlTheme,
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
                const optionProps: IHtmlSelectControlOption =
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

HtmlSelectControl.theme = htmlSelectControlTheme;
HtmlSelectControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
