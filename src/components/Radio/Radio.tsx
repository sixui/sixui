import { useCallback, useState } from 'react';

import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { useLabeledContext } from '../Labeled';
import { useRadioGroupContext } from '../RadioGroup';
import { RadioTheme } from './Radio.css';

const COMPONENT_NAME = 'Radio';

export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    disabled,
    checked: checkedProp,
    onChange,
    readOnly: readOnlyProp,
    loading: loadingProp,
    name: nameProp,
    value,
    id: idProp,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const labeledContext = useLabeledContext();
  const radioGroupContext = useRadioGroupContext();
  const [handlingChange, setHandlingChange] = useState(false);

  const loading = loadingProp || handlingChange || labeledContext?.loading;
  const readOnly = (readOnlyProp ?? labeledContext?.readOnly) || loading;
  const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
  const id = idProp ?? labeledContext?.id;

  const name = radioGroupContext?.name ?? nameProp;
  const checked = radioGroupContext
    ? radioGroupContext.value !== undefined && radioGroupContext.value === value
    : checkedProp;

  const { getStyles } = useComponentTheme<IRadioThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    theme: RadioTheme,
    modifiers: {
      disabled: disabledOrReadOnly,
    },
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      void executeLazyPromise(() => {
        radioGroupContext?.onChange?.(
          event,
          event.target.checked ? event.target.value : undefined,
        );
        void onChange?.(
          event,
          event.target.checked ? event.target.value : undefined,
        );
      }, setHandlingChange);
    },
    [handlingChange, onChange, radioGroupContext],
  );

  return (
    <ButtonBase
      {...getStyles('root')}
      onClick={() => {}}
      classNames={mergeClassNames(classNames, {
        stateLayer: getStyles('stateLayer').className,
        focusRing: getStyles('focusRing').className,
      })}
      disabled={disabled}
      readOnly={readOnly}
      ref={forwardedRef}
      {...other}
    >
      <input
        name={name}
        type="radio"
        checked={checked}
        onChange={handleChange}
        value={value}
        id={id}
        {...getStyles('input')}
      />
    </ButtonBase>
  );
});

Radio.theme = RadioTheme;
Radio.displayName = `@sixui/${COMPONENT_NAME}`;
