import type { ICircularProgressIndicatorFactory } from './CircularProgressIndicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
// import { DeterminateCircularProgressIndicator } from '../DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { circularProgressIndicatorStyles } from './CircularProgressIndicator.css';

const COMPONENT_NAME = 'CircularProgressIndicator';

export const CircularProgressIndicator =
  componentFactory<ICircularProgressIndicatorFactory>((props, forwardedRef) => {
    // FIXME:
    // const { value } = props;

    // return value === undefined ? (
    //   <IndeterminateCircularProgressIndicator {...props} ref={forwardedRef} />
    // ) : (
    //   <DeterminateCircularProgressIndicator
    //     {...props}
    //     ref={forwardedRef}
    //     value={value}
    //   />
    // );

    return (
      <IndeterminateCircularProgressIndicator {...props} ref={forwardedRef} />
    );
  });

CircularProgressIndicator.styles = circularProgressIndicatorStyles;
CircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
