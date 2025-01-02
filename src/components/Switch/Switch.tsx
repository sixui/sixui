import { useCallback, useState } from 'react';

import type { ISwitchThemeFactory } from './Switch.css';
import type { ISwitchFactory } from './Switch.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { FocusRing } from '../FocusRing';
import { useLabeledContext } from '../Labeled';
import { StateLayer, useStateLayer } from '../StateLayer';
import { SwitchIndicator } from '../SwitchIndicator';
import { basicTemplateTheme } from './Switch.css';

const COMPONENT_NAME = 'Switch';

export const Switch = componentFactory<ISwitchFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      interactions,
      interactionsMergeStrategy,
      checked: checkedProp,
      defaultChecked,
      onChange,
      required: requiredProp,
      disabled,
      readOnly: readOnlyProp,
      loading: loadingProp,
      checkedIcon,
      uncheckedIcon,
      alwaysOn,
      id: idProp,
      value,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const [handlingChange, setHandlingChange] = useState(false);
    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });

    const loading = loadingProp || handlingChange || labeledContext?.loading;
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;
    const hasIcon =
      loading || (checked && !!checkedIcon) || (!checked && !!uncheckedIcon);
    const isOn = checked || alwaysOn;

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const { getStyles } = useComponentTheme<ISwitchThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: basicTemplateTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        checked,
        'with-icon': hasIcon,
        loading,
        on: isOn,
      },
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          if (handlingChange) {
            return;
          }

          void executeLazyPromise(
            () =>
              onChange?.(
                event,
                event.target.checked ? event.target.value : undefined,
              ) as void,
            setHandlingChange,
          ).finally(() => setChecked(!event.target.checked));
        },
        [handlingChange, onChange, setChecked],
      );

    return (
      <Box
        {...getStyles('root')}
        interactions={stateLayer.interactionsContext.state}
        ref={rootRef}
        {...other}
      >
        {!disabledOrReadOnly && (
          <FocusRing
            {...getStyles('focusRing')}
            interactions={stateLayer.interactionsContext.state}
          />
        )}

        <SwitchIndicator
          checked={checked}
          loading={loading}
          disabled={disabledOrReadOnly}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          alwaysOn={alwaysOn}
          stateLayer={
            <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
          }
        />

        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          ref={inputHandleRef}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />
      </Box>
    );
  },
);

Switch.theme = basicTemplateTheme;
Switch.displayName = `@sixui/${COMPONENT_NAME}`;
Switch.Indicator = SwitchIndicator;
