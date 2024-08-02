import type {
  IFieldBaseOwnProps,
  IFieldBaseStylesKey,
} from '~/components/FieldBase';
import type {
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '~/helpers/types';
import type { IHtmlSelectStylesKey } from './HtmlSelect.styles';

export type IHtmlSelectOption = {
  value: string | number;
  label?: string;
};

export type IHtmlSelectProps = IContainerProps<IHtmlSelectStylesKey> &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    innerStyles?: {
      fieldBase?: IZeroOrMore<ICompiledStyles<IFieldBaseStylesKey>>;
    };

    /**
     * Shorthand for supplying options: an array of basic types or
     * `{ label?, value }` objects. If no `label` is supplied, `value`
     * will be used as the labÒel.
     */
    items: ReadonlyArray<string | number | IHtmlSelectOption>;

    /**
     * Multiple select is not supported.
     */
    multiple?: never;

    slotProps?: {
      fieldBase?: IFieldBaseOwnProps;
    };
  };
