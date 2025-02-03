export interface IOverlay<TProps extends object> {
  id: string;
  component: React.ComponentType<TProps>;
  props?: TProps;
  layer?: string;
}
