import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IHtmlSelectOption, IHtmlSelectProps } from './HtmlSelect.types';
import { useStyles } from '~/hooks/useStyles';
import { iconTriangleDown } from '~/assets/icons';
import { useVisualState } from '../VisualState';
import { FieldBase } from '../FieldBase';
import { SvgIcon } from '../SvgIcon';
import {
  htmlSelectFieldBaseStyles,
  htmlSelectStyles,
} from './HtmlSelect.styles';

export const HtmlSelect = forwardRef<HTMLSelectElement, IHtmlSelectProps>(
  function HtmlSelect(props, forwardedRef) {
    const { styles, sx, innerStyles, items, slotProps, ...other } = props;

    const { getStyles, globalStyles } = useStyles({
      componentName: 'HtmlSelect',
      styles: [htmlSelectStyles, styles],
    });

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
        sx={[globalStyles, sx]}
        styles={[htmlSelectFieldBaseStyles, ...asArray(innerStyles?.fieldBase)]}
        disabled={other.disabled}
        trailingIcon={<SvgIcon icon={iconTriangleDown} />}
        {...slotProps?.fieldBase}
        visualState={visualState}
      >
        <select
          {...other}
          {...getStyles('select')}
          ref={selectHandleRef}
          multiple={false}
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
          {props.children}
        </select>
      </FieldBase>
    );
  },
);
