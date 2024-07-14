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
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from '@/components/atoms/Placeholder';
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
import type {
  IRadioStyleKey,
  IRadioStyleVarKey,
} from '@/components/atoms/Radio';
import type { IListStylesKey } from '@/components/atoms/List';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
} from '@/components/atoms/Paper';
import type { ITabStyleKey, ITabStyleVarKey } from '@/components/atoms/Tab';
import type { ITabListStyleKey } from '@/components/atoms/TabList';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import type {
  IScrimStyleKey,
  IScrimStyleVarKey,
} from '@/components/atoms/Scrim';
import type {
  IMenuListStyleKey,
  IMenuListStyleVarKey,
} from '@/components/atoms/MenuList';
import type { IStepperStyleKey } from '@/components/atoms/Stepper';
import type { IStepStyleKey, IStepStyleVarKey } from '@/components/atoms/Step';
import type {
  IStepConnectorStyleKey,
  IStepConnectorStyleVarKey,
} from '@/components/atoms/StepConnector';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from '@/components/molecules/ElementWithLabel';
import type {
  ISkeletonStyleKey,
  ISkeletonStyleVarKey,
} from '@/components/atoms/Skeleton';
import type {
  ISnackbarStyleKey,
  ISnackbarStyleVarKey,
} from '@/components/atoms/Snackbar';
import type {
  ISnackbarContentStyleKey,
  ISnackbarContentStyleVarKey,
} from '@/components/atoms/SnackbarContent';
import type {
  IPlainTooltipContentStyleKey,
  IPlainTooltipContentStyleVarKey,
} from '@/components/atoms/PlainTooltipContent';
import type {
  IRichTooltipContentStyleKey,
  IRichTooltipContentStyleVarKey,
} from '@/components/atoms/RichTooltipContent';
import type {
  IOptionCardStyleKey,
  IOptionCardStyleVarKey,
} from '@/components/atoms/OptionCard';
import type { IButtonStylesKey } from '@/components/atoms/Button';
import type { ICardStylesKey } from '@/components/atoms/Card/Card.styles';
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

export type IPaperTheme = {
  vars?: IStyleVarsTheme<IPaperStyleVarKey>;
  styles?: ICompiledStyles<IPaperStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
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
    Placeholder: {
      vars: IStyleVarsTheme<IPlaceholderStyleVarKey>;
      styles: ICompiledStyles<IPlaceholderStyleKey>;
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
    Radio: {
      vars?: IStyleVarsTheme<IRadioStyleVarKey>;
      styles?: ICompiledStyles<IRadioStyleKey>;
      stateLayerStyles: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStylesKey>;
    };
    Paper: IPaperTheme;
    FilledPaper: IPaperTheme;
    OutlinedPaper: IPaperTheme & {
      styles?: ICompiledStyles<IPaperStyleKey>;
    };
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
    Scrim: {
      vars?: IStyleVarsTheme<IScrimStyleVarKey>;
      styles?: ICompiledStyles<IScrimStyleKey>;
    };
    MenuList: {
      vars?: IStyleVarsTheme<IMenuListStyleVarKey>;
      styles?: ICompiledStyles<IMenuListStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      listStyles?: ICompiledStyles<IListStylesKey>;
    };
    Stepper: {
      styles?: ICompiledStyles<IStepperStyleKey>;
    };
    Step: {
      vars?: IStyleVarsTheme<IStepStyleVarKey>;
      styles?: ICompiledStyles<IStepStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStylesKey>;
    };
    StepConnector: {
      vars?: IStyleVarsTheme<IStepConnectorStyleVarKey>;
      styles?: ICompiledStyles<IStepConnectorStyleKey>;
    };
    ElementWithLabel: {
      vars?: IStyleVarsTheme<IElementWithLabelStyleVarKey>;
      styles?: ICompiledStyles<IElementWithLabelStyleKey>;
    };
    Skeleton: {
      vars?: IStyleVarsTheme<ISkeletonStyleVarKey>;
      styles?: ICompiledStyles<ISkeletonStyleKey>;
    };
    Snackbar: {
      vars?: IStyleVarsTheme<ISnackbarStyleVarKey>;
      styles?: ICompiledStyles<ISnackbarStyleKey>;
    };
    SnackbarContent: {
      vars?: IStyleVarsTheme<ISnackbarContentStyleVarKey>;
      styles?: ICompiledStyles<ISnackbarContentStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      actionButtonStyles?: ICompiledStyles<IButtonStylesKey>;
    };
    PlainTooltipContent: {
      vars?: IStyleVarsTheme<IPlainTooltipContentStyleVarKey>;
      styles?: ICompiledStyles<IPlainTooltipContentStyleKey>;
    };
    RichTooltipContent: {
      vars?: IStyleVarsTheme<IRichTooltipContentStyleVarKey>;
      styles?: ICompiledStyles<IRichTooltipContentStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
    };
    OptionCard: {
      vars?: IStyleVarsTheme<IOptionCardStyleVarKey>;
      styles?: ICompiledStyles<IOptionCardStyleKey>;
      cardStyles?: ICompiledStyles<ICardStylesKey>;
    };
  };
};

export type IThemeSettings = {
  linkAs: React.ElementType;
};
