import type { IStringFromStylesProps } from '~/utils/css/stringFromStyles';

export interface IInlineStylesProps
  extends IStringFromStylesProps,
    Omit<
      React.ComponentPropsWithoutRef<'style'>,
      keyof IStringFromStylesProps
    > {}
