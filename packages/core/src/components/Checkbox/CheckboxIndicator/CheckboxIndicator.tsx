import type { ICheckboxIndicatorThemeFactory } from './CheckboxIndicator.css';
import type { ICheckboxIndicatorFactory } from './CheckboxIndicator.types';
import { Checkmark } from '~/components/Checkmark';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { PaperBase } from '~/components/PaperBase';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { usePrevious } from '~/hooks/usePrevious';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CheckboxIndicator.constants';
import { checkboxIndicatorTheme } from './CheckboxIndicator.css';

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
      modifiers: {
        on,
        'was-disabled': wasDisabled,
        loading,
        disabled,
      },
    });

    return (
      <PaperBase
        {...getStyles('root')}
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

CheckboxIndicator.theme = checkboxIndicatorTheme;
CheckboxIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
