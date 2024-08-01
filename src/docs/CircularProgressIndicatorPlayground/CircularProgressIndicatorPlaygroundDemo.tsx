import {
  CircularProgressIndicator,
  type ICircularProgressIndicatorProps,
} from '~/components/CircularProgressIndicator';

export type ICircularProgressIndicatorPlaygroundDemoProps = {
  circularProgressIndicator: ICircularProgressIndicatorProps;
};

export const CircularProgressIndicatorPlaygroundDemo: React.FC<
  ICircularProgressIndicatorPlaygroundDemoProps
> = (props) => (
  <CircularProgressIndicator {...props.circularProgressIndicator} />
);
