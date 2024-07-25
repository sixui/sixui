import type { IContainerProps } from '@/helpers/types';
import type { IPlaygroundStylesKey } from './Playground.styles';

export type IPlaygroundOptionModifiers = {
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  toggleable?: boolean;
};

export type IPlaygroundOption = {
  label: string;
  supportingText?: string;
  modifiers?: IPlaygroundOptionModifiers;
} & (
  | {
      type: 'string';
      defaultValue?: string;
    }
  | {
      type: 'boolean';
      defaultValue?: boolean;
    }
);

export type IPlaygroundOptions<TComponentProps = object> = Partial<
  Record<keyof TComponentProps, IPlaygroundOption>
>;

export type IPlaygroundProps<
  TComponentProps extends object = Record<string, never>,
> = IContainerProps<IPlaygroundStylesKey> & {
  componentRenderer: (props: TComponentProps) => JSX.Element;
  options: IPlaygroundOptions<TComponentProps>;
};
