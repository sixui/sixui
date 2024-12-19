import { useCallback, useState } from 'react';

import type { ISwitchThemeFactory } from './Switch.css';
import type { ISwitchFactory } from './Switch.types';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { useLabeledContext } from '../Labeled';
import { PaperBase } from '../PaperBase';
import { StateLayer, useStateLayer } from '../StateLayer';
import { SvgIcon } from '../SvgIcon';
import { basicTemplateTheme } from './Switch.css';

const COMPONENT_NAME = 'Switch';

export const Switch = componentFactory<ISwitchFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      interactions,
      interactionsMergeStrategy,
      checked: checkedProp,
      defaultChecked,
      onChange,
      disabled,
      readOnly: readOnlyProp,
      loading: loadingProp,
      checkedIcon,
      uncheckedIcon,
      alwaysOn,
      id: idProp,
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
    const id = idProp ?? labeledContext?.id;
    const hasIcon =
      loading || (checked && !!checkedIcon) || (!checked && !!uncheckedIcon);
    const isOn = checked || alwaysOn;

    const stateLayer = useStateLayer<HTMLDivElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly,
      withoutRippleEffect: true,
    });
    const handleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const { getStyles } = useComponentTheme<ISwitchThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
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
      <PaperBase
        {...getStyles('root')}
        classNames={classNames}
        interactions={stateLayer.interactionsContext.state}
        ref={forwardedRef}
        {...other}
      >
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
          data-cy="switch"
          id={id}
          required={labeledContext?.required}
          ref={handleRef}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />

        <div {...getStyles('track')}>
          <div {...getStyles('handleContainer')}>
            <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
            <PaperBase {...getStyles('handle')}>
              <div {...getStyles(['icon', 'icon$checked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator />
                ) : checkedIcon === true ? (
                  <SvgIcon icon={iconCheckMark} />
                ) : (
                  checkedIcon
                )}
              </div>

              <div {...getStyles(['icon', 'icon$unchecked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator />
                ) : uncheckedIcon === true ? (
                  <SvgIcon icon={iconXMark} />
                ) : (
                  uncheckedIcon
                )}
              </div>
            </PaperBase>
          </div>
        </div>

        {!disabled && (
          <FocusRing
            {...getStyles('focusRing')}
            interactions={stateLayer.interactionsContext.state}
          />
        )}
      </PaperBase>
    );
  },
);

Switch.theme = basicTemplateTheme;
Switch.displayName = `@sixui/${COMPONENT_NAME}`;
