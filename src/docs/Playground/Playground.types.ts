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

export type IPlaygroundOption<
  TSectionsProps extends Record<string, object>,
  TSectionKey extends keyof TSectionsProps = keyof TSectionsProps,
  TSectionProps = TSectionsProps[TSectionKey],
> = {
  label?: string;
  supportingText?: string;
  input?: {
    targetProp: keyof TSectionProps;
  } & (
    | IPlaygroundOptionValue<'string', string>
    | IPlaygroundOptionValue<'boolean', boolean>
  );
  props?: Partial<TSectionProps>;
  modifiers?: IPlaygroundOptionModifiers;
  getModifiers?: (sectionsProps?: TSectionsProps) => IPlaygroundOptionModifiers;
};

export type IPlaygroundSections<TSectionsProps extends Record<string, object>> =
  {
    [sectionPropsKey in keyof TSectionsProps]: {
      title?: string;
      options: Array<IPlaygroundOption<TSectionsProps, sectionPropsKey>>;
    };
  };

export type IPlaygroundProps<TSectionsProps extends Record<string, object>> =
  IContainerProps<IPlaygroundStylesKey> & {
    defaultSections: IPlaygroundSections<TSectionsProps>;
    componentRenderer: (sectionsProps: TSectionsProps) => JSX.Element;
  };
