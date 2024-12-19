import { useCallback, useState } from 'react';

import type { ISwitchThemeFactory } from './Switch.css';
import type { ISwitchFactory } from './Switch.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { FocusRing } from '../FocusRing';
import { useLabeledContext } from '../Labeled';
import { PaperBase } from '../PaperBase';
import { StateLayer, useStateLayer } from '../StateLayer';
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
      icons,
      icon,
      checkedIcon,
      showOnlyCheckedIcon: showOnlyCheckedIconProp,
      loadingAnimation = 'progressIndicator',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const [handlingChange, setHandlingChange] = useState(false);
    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });

    const loading =
      (loadingProp || handlingChange || labeledContext?.loading) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;

    const hasCustomIcons = !!icon || !!checkedIcon;
    const hasIcons = icons || hasCustomIcons || loading;
    const showOnlyCheckedIcon = !loading && showOnlyCheckedIconProp;
    const shouldShowIcons = hasIcons || showOnlyCheckedIcon;

    const stateLayer = useStateLayer<HTMLDivElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly,
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
        'with-icon': showOnlyCheckedIcon ? checked : hasIcons,
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
        ref={forwardedRef}
        interactions={stateLayer.interactionsContext.state}
        {...mergeProps(stateLayer.interactionsContext.triggerProps, other)}
      >
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={disabledOrReadOnly ? undefined : handleChange}
          data-cy="switch"
          id={labeledContext?.id}
          required={labeledContext?.required}
          {...other}
          {...getStyles('input')}
          ref={handleRef}
        />
        <div {...getStyles('handleContainer')}>
          <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
          <PaperBase {...getStyles('handle')} />
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
