import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IOverlayableVariant } from './Overlayable.types';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'visible';

const classNames = createStyles({
  root: {
    position: 'relative',
    borderRadius: 'inherit',
  },
  content: ({ root }) => ({
    borderRadius: 'inherit',

    selectors: {
      [getModifierSelector<IModifier>('visible', root)]: {
        visibility: 'hidden',
      },
    },
  }),
  overlay: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
  },
});

export type IOverlayableThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  variant: IOverlayableVariant;
}>;

export const overlayableTheme = componentThemeFactory<IOverlayableThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
