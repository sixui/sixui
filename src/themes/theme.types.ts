import type { ICompiledStyles, IStyleVarsTheme } from '@/helpers/types';
import type { IColorRolesThemeVars } from './colorRoles.types';
import type {
  IBasicTemplateStyleKey,
  IBasicTemplateStyleVarKey,
} from '@/components/atoms/Template/BasicTemplate';
import type {
  IVariableTemplateStyleKey,
  IVariableTemplateStyleVarKey,
} from '@/components/atoms/Template/VariableTemplate';
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
import type {
  ISwitchStyleKey,
  ISwitchStyleVarKey,
} from '@/components/atoms/Switch';
import type { IFieldBaseStylesKey } from '@/components/atoms/FieldBase';
import type {
  ITextFieldBaseStyleKey,
  ITextFieldBaseStyleVarKey,
} from '@/components/atoms/TextFieldBase';
import type { ITabStyleKey, ITabStyleVarKey } from '@/components/atoms/Tab';
import type { ITabListStyleKey } from '@/components/atoms/TabList';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from '@/components/molecules/ElementWithLabel';
import type { ICircularProgressIndicatorStylesKey } from '@/components/atoms/CircularProgressIndicator';

export type IBasicTemplateTheme = {
  vars?: IStyleVarsTheme<IBasicTemplateStyleVarKey>;
  styles?: ICompiledStyles<IBasicTemplateStyleKey>;
};

export type IVariableTemplateTheme = {
  vars?: IStyleVarsTheme<IVariableTemplateStyleVarKey>;
  styles?: ICompiledStyles<IVariableTemplateStyleKey>;
};

export type ITextFieldBaseTheme = {
  vars?: IStyleVarsTheme<ITextFieldBaseStyleVarKey>;
  styles?: ICompiledStyles<ITextFieldBaseStyleKey>;
  fieldStyles?: ICompiledStyles<IFieldBaseStylesKey>;
};

export type ITabTheme = {
  vars?: IStyleVarsTheme<ITabStyleVarKey>;
  styles?: ICompiledStyles<ITabStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
};

export type ITheme = {
  name: string;
  colorSchemes: {
    dark: IStyleVarsTheme<keyof IColorRolesThemeVars>;
  };
  colorRoles: {
    dark: IColorRolesThemeVars;
  };
  components: {
    Template: IBasicTemplateTheme;
    VariantTemplate: IVariableTemplateTheme;
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
    Switch: {
      vars: IStyleVarsTheme<ISwitchStyleVarKey>;
      styles: ICompiledStyles<ISwitchStyleKey>;
      stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStylesKey>;
    };
    TextFieldBase: ITextFieldBaseTheme;
    FilledTextField: ITextFieldBaseTheme;
    OutlinedTextField: ITextFieldBaseTheme;
    Tab: ITabTheme;
    PrimaryTab: ITabTheme;
    SecondaryTab: ITabTheme;
    TabList: {
      styles?: ICompiledStyles<ITabListStyleKey>;
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
