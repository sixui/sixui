import type { IContainerProps } from '~/helpers/types';
import type { IHtmlSelectProps } from '~/components/HtmlSelect';
import type { IPlaygroundStylesKey } from './Playground.styles';

export type IPlaygroundOptionModifiers = {
  required?: boolean;
  /**
   * @deprecated - use `on`
   */
  off?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

export type IPlaygroundOptionValue<TTypeName extends string, TValueType> = {
  type: TTypeName;
  value?: TValueType;
  items?: IHtmlSelectProps['items'];
  getValue?: (value: unknown) => TValueType;
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
    | (IPlaygroundOptionValue<'number', number> & {
        min?: number;
        max?: number;
      })
    | IPlaygroundOptionValue<'boolean', boolean>
  );
  props?: Partial<TSectionProps>;
  getProps?: (sectionsProps?: TSectionsProps) => Partial<TSectionProps>;
  modifiers?: IPlaygroundOptionModifiers;
  getModifiers?: (sectionsProps?: TSectionsProps) => IPlaygroundOptionModifiers;
};

export type IPlaygroundSections<TSectionsProps extends Record<string, object>> =
  {
    [sectionPropsKey in keyof TSectionsProps]: {
      title?: string;
      props?: Partial<TSectionsProps[sectionPropsKey]>;
      getProps?: (
        sectionsProps?: TSectionsProps,
      ) => Partial<TSectionsProps[sectionPropsKey]>;
      options: Array<IPlaygroundOption<TSectionsProps, sectionPropsKey>>;
    };
  };

export type IPlaygroundProps<TSectionsProps extends Record<string, object>> =
  IContainerProps<IPlaygroundStylesKey> & {
    defaultSections: IPlaygroundSections<TSectionsProps>;
    componentRenderer: (sectionsProps: TSectionsProps) => JSX.Element;
  };
