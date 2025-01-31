import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { COMPONENT_NAME } from './Overlayable.constants';

type IModifier = 'visible' | 'keep-content-visible';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    position: 'relative',
    borderRadius: 'inherit',
  },
  content: ({ root }) => ({
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    selectors: {
      [modifierSelector<IModifier>(['visible', '!keep-content-visible'], root)]:
        {
          visibility: 'hidden',
        },
    },
  }),
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderRadius: 'inherit',
  },
});

export type IOverlayableThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const overlayableTheme = componentThemeFactory<IOverlayableThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
