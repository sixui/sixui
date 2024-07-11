import { forwardRef, useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { useMergeRefs } from '@floating-ui/react';
import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';

import type { IHtmlSelectOption } from './HtmlSelectProps';
import { useVisualState } from '@/components/utils/VisualState';
import { componentVars as fieldBaseVars } from '@/themes/base/FieldBase/FieldBase.stylex';
import {
  FieldBase,
  type IFieldBaseOwnProps,
} from '@/components/atoms/FieldBase';

export interface IHtmlSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Shorthand for supplying options: an array of basic types or
   * `{ label?, value }` objects. If no `label` is supplied, `value`
   * will be used as the labÒel.
   */
  options: ReadonlyArray<string | number | IHtmlSelectOption>;

  /**
   * Multiple select is not supported.
   */
  multiple?: never;

  slotProps?: {
    fieldBase?: IFieldBaseOwnProps;
  };
}

const styles = stylex.create({
  select: {
    flexGrow: 1,
    cursor: 'pointer',
    appearance: 'none',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

const fieldBaseStyles = stylex.create({
  host: {
    [fieldBaseVars.topSpace]: '0px',
    [fieldBaseVars.bottomSpace]: '0px',
    [fieldBaseVars.leadingSpace]: '0px',
    [fieldBaseVars.trailingSpace]: '0px',
  },
  section$start: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingInlineStart: 16,
    pointerEvents: 'none',
  },
  section$end: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});

export const HtmlSelect = forwardRef<HTMLSelectElement, IHtmlSelectProps>(
  function HtmlSelect(props, forwardedRef) {
    const { options, slotProps, ...other } = props;

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
        styles={fieldBaseStyles}
        disabled={other.disabled}
        trailingIcon={<TriangleDownIcon aria-hidden />}
        {...slotProps?.fieldBase}
        visualState={visualState}
      >
        <select
          {...stylex.props(styles.select)}
          ref={selectHandleRef}
          {...other}
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
