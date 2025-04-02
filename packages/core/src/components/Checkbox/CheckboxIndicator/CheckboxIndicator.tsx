import type { ICheckboxIndicatorThemeFactory } from './CheckboxIndicator.css';
import type { ICheckboxIndicatorFactory } from './CheckboxIndicator.types';
import { Checkmark } from '~/components/Checkmark';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { PaperBase } from '~/components/PaperBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { usePrevious } from '~/hooks/usePrevious';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CheckboxIndicator.constants';
import { checkboxIndicatorTheme } from './CheckboxIndicator.css';

/**
 * @see https://m3.material.io/components/checkbox/overview
 */
export const CheckboxIndicator = componentFactory<ICheckboxIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked: checkedProp,
      indeterminate,
      loading,
      disabled: disabledProp,
      hasError,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const checked = checkedProp && !indeterminate;
    const unchecked = !checkedProp && !indeterminate;
    const on = checkedProp || indeterminate;
    const disabled = disabledProp || loading;

    const wasUnchecked = usePrevious(unchecked) ?? false;
    const wasDisabled = usePrevious(disabled) ?? false;

    const { getStyles } = useComponentTheme<ICheckboxIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxIndicatorTheme,
    });

    return (
      <PaperBase
        {...getStyles('root', {
          modifiers: {
            on,
            'was-disabled': wasDisabled,
            loading,
            disabled,
            'with-error': hasError,
          },
        })}
        ref={forwardedRef}
        disabled={disabled}
        {...other}
      >
        {loading ? (
          <IndeterminateCircularProgressIndicator
            {...getStyles('progressIndicator')}
            disabled={disabled}
          />
        ) : (
          <>
            <div {...getStyles(['layer', 'background'])} />
            <Checkmark
              {...getStyles('icon')}
              disabled={disabled}
              checked={checked}
              indeterminate={indeterminate}
              wasUnchecked={wasUnchecked}
              wasDisabled={wasDisabled}
            />
          </>
        )}
      </PaperBase>
    );
  },
);

CheckboxIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
CheckboxIndicator.theme = checkboxIndicatorTheme;
