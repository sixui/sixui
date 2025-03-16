import type { ILabeledProps } from '~/components/Labeled';
import type { ICheckboxGroupFactory } from './CheckboxGroup.types';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CheckboxGroup.constants';
import { CheckboxGroupControl } from './CheckboxGroupControl';

export const CheckboxGroup = componentFactory<ICheckboxGroupFactory>(
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
          <CheckboxGroupControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...foreignProps}
            {...controlProps}
          >
            {children}
          </CheckboxGroupControl>
        )}
      </Labeled>
    );
  },
);

CheckboxGroup.displayName = `@sixui/core/${COMPONENT_NAME}`;
CheckboxGroup.Item = CheckboxGroupControl.Item;
CheckboxGroup.Card = CheckboxGroupControl.Card;
