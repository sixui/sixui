import type { ICompiledStyles, IStyleVarsTheme } from '@/helpers/types';
import type { IColorRolesThemeVars } from './colorRoles.types';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from '@/components/utils/ComponentShowcase';
import type {
  IStateLayerStyleKey,
  IStateLayerStyleVarKey,
} from '@/components/utils/StateLayer';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from '@/components/utils/Elevation';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from '@/components/utils/FocusRing';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from '@/components/molecules/ElementWithLabel';

export type ITheme = {
  name: string;
  colorSchemes: {
    dark: IStyleVarsTheme<keyof IColorRolesThemeVars>;
  };
  colorRoles: {
    dark: IColorRolesThemeVars;
  };
  components: {
    ComponentShowcase: {
      vars: IStyleVarsTheme<IComponentShowcaseStyleVarKey>;
      styles: ICompiledStyles<IComponentShowcaseStyleKey>;
    };
    StateLayer: {
      vars: IStyleVarsTheme<IStateLayerStyleVarKey>;
      styles: ICompiledStyles<IStateLayerStyleKey>;
    };
    Elevation: {
      vars: IStyleVarsTheme<IElevationStyleVarKey>;
      styles: ICompiledStyles<IElevationStyleKey>;
    };
    FocusRing: {
      vars: IStyleVarsTheme<IFocusRingStyleVarKey>;
      styles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Typography: {
      styles?: ICompiledStyles<ITypographyStyleKey>;
    };
    Anchored: {
      styles?: ICompiledStyles<IAnchoredStyleKey>;
    };
    ElementWithLabel: {
      vars?: IStyleVarsTheme<IElementWithLabelStyleVarKey>;
      styles?: ICompiledStyles<IElementWithLabelStyleKey>;
    };
  };
};

export type IThemeSettings = {
  linkAs: React.ElementType;
};
