import type { ILabeledProps } from '~/components/Labeled';
import type { ISelectFactory } from './Select.types';
import type { ISelectControlProps } from './SelectControl';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Select.constants';
import { SelectControl } from './SelectControl';

export const Select = componentFactory<ISelectFactory>(
  (props, forwardedRef) => {
    const {
      labeledProps,
      controlProps,
      errorTextPosition = 'end',
      skeleton,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Labeled
        errorTextPosition={errorTextPosition}
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {skeleton ? (
          <SelectControl.Skeleton disabled={other.disabled} />
        ) : (
          ({ foreignProps, ...labeledControlProps }) => (
            <SelectControl
              ref={forwardedRef}
              {...labeledControlProps}
              {...(foreignProps as unknown as ISelectControlProps)}
              {...controlProps}
            />
          )
        )}
      </Labeled>
    );
  },
);

Select.displayName = `@sixui/core/${COMPONENT_NAME}`;
Select.Control = SelectControl;
