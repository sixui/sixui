import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IFieldBaseVariant } from '../FieldBase';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { FieldBase } from '../FieldBase';

const classNames = createStyles({
  select: {
    flexGrow: 1,
    cursor: 'pointer',
    appearance: 'none',
    height: '100%',
    position: 'absolute',
    inset: 0,
    paddingLeft: FieldBase.theme.tokens.leadingSpace,
    paddingRight: FieldBase.theme.tokens.trailingSpace,
    paddingTop: FieldBase.theme.tokens.topSpace.normal,
    paddingBottom: FieldBase.theme.tokens.bottomSpace.normal,
  },
  section$start: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingInlineStart: px(space(4)),
    pointerEvents: 'none',
  },
  section$end: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: FieldBase.theme.tokens.trailingContent.minWidth,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});

export type IHtmlSelectThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  variant: IFieldBaseVariant;
}>;

export const htmlSelectTheme = componentThemeFactory<IHtmlSelectThemeFactory>({
  classNames,
  tokens: undefined,
});
