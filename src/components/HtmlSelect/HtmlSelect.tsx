import { forwardRef, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IHtmlSelectOption, IHtmlSelectProps } from './HtmlSelect.types';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useVisualState } from '@/components/VisualState';
import { FieldBase } from '@/components/FieldBase';
import { SvgIcon } from '@/components/SvgIcon';
import {
  htmlSelectFieldBaseStyles,
  htmlSelectStyles,
} from './HtmlSelect.styles';
import { iconTriangleDown } from '@/assets/icons';

export const HtmlSelect = forwardRef<HTMLSelectElement, IHtmlSelectProps>(
  function HtmlSelect(props, forwardedRef) {
    const { styles, sx, innerStyles, options, slotProps, ...other } = props;

    const componentTheme = useComponentTheme('HtmlSelect');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(htmlSelectStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const { visualState, setRef: setVisualStateRef } = useVisualState(
      slotProps?.fieldBase?.visualState,
      { disabled: other.disabled },
    );

    const selectRef = useRef<HTMLSelectElement | null>(null);
    const selectHandleRef = useMergeRefs([
      selectRef,
      setVisualStateRef,
      forwardedRef,
    ]);

    return (
      <FieldBase
        sx={[componentTheme.overridenStyles, sx]}
        styles={[htmlSelectFieldBaseStyles, ...asArray(innerStyles?.fieldBase)]}
        disabled={other.disabled}
        trailingIcon={<SvgIcon icon={iconTriangleDown} />}
        {...slotProps?.fieldBase}
        visualState={visualState}
      >
        <select
          {...sxf('select')}
          {...other}
          ref={selectHandleRef}
          multiple={false}
        >
          {options.map((option) => {
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
          {props.children}
        </select>
      </FieldBase>
    );
  },
);
