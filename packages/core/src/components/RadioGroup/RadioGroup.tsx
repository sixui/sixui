import type { ILabeledProps } from '~/components/Labeled';
import type { IRadioGroupFactory } from './RadioGroup.types';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './RadioGroup.constants';
import { RadioGroupControl } from './RadioGroupControl';

export const RadioGroup = componentFactory<IRadioGroupFactory>(
  (props, forwardedRef) => {
    const { labeledProps, controlProps, children, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Labeled
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {({ foreignProps, ...labeledControlProps }) => (
          <RadioGroupControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...foreignProps}
            {...controlProps}
          >
            {children}
          </RadioGroupControl>
        )}
      </Labeled>
    );
  },
);

RadioGroup.displayName = `@sixui/core/${COMPONENT_NAME}`;
RadioGroup.Item = RadioGroupControl.Item;
RadioGroup.Card = RadioGroupControl.Card;
