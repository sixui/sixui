import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { FieldBase } from '~/components/FieldBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './HtmlSelect.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

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
    padding: 0,
  },
  section$start: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingInlineStart: px(space('$lg')),
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
  tokensClassName,
  tokens,
});
