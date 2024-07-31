import type { IContainerProps } from '~/helpers/types';
import type { IHtmlSelectProps } from '~/components/HtmlSelect';
import type { IPlaygroundStylesKey } from './Playground.styles';

export type IPlaygroundOptionModifiers = {
  required?: boolean;
  off?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

export type IPlaygroundOptionValue<TTypeName extends string, TType> = {
  type: TTypeName;
  value?: TType;
  items?: IHtmlSelectProps['items'];
};

export type IPlaygroundOption<TComponentProps> = {
  label?: string;
  supportingText?: string;
  input?: {
    targetProp: keyof TComponentProps;
  } & (
    | IPlaygroundOptionValue<'string', string>
    | IPlaygroundOptionValue<'boolean', boolean>
  );
  props?: Partial<TComponentProps>;
  modifiers?: IPlaygroundOptionModifiers;
  getModifiers?: (
    componentProps?: TComponentProps,
  ) => IPlaygroundOptionModifiers;
};

export type IPlaygroundOptions<TComponentProps> = Array<
  IPlaygroundOption<TComponentProps>
>;

export type IPlaygroundSections<TComponentProps> = Array<{
  title: string;
  options: IPlaygroundOptions<TComponentProps>;
}>;

export type IPlaygroundProps<
  TComponentProps extends object = Record<string, never>,
> = IContainerProps<IPlaygroundStylesKey> & {
  defaultSections: IPlaygroundSections<TComponentProps>;
  componentRenderer: (props: TComponentProps) => JSX.Element;
  initialProps?: Partial<TComponentProps>;
};
