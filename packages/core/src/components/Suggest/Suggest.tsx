import type { ILabeledProps } from '~/components/Labeled';
import type { ISuggestFactory } from './Suggest.types';
import type { ISuggestControlProps } from './SuggestControl';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Suggest.constants';
import { SuggestControl } from './SuggestControl';

export const Suggest = componentFactory<ISuggestFactory>(
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
          <SuggestControl.Skeleton disabled={other.disabled} />
        ) : (
          ({ foreignProps, ...labeledControlProps }) => (
            <SuggestControl
              ref={forwardedRef}
              {...labeledControlProps}
              {...(foreignProps as unknown as ISuggestControlProps)}
              {...controlProps}
            />
          )
        )}
      </Labeled>
    );
  },
);

Suggest.displayName = `@sixui/core/${COMPONENT_NAME}`;
Suggest.Control = SuggestControl;
