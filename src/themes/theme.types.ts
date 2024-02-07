import type { ICompiledStyles, IStyleVarsTheme } from '@/helpers/types';
import type { IColorRoles } from './colorRoles.types';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from '@/components/atoms/Template';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from '@/components/utils/ComponentShowcase';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from '@/components/atoms/Placeholder';
import type {
  IRippleStyleKey,
  IRippleStyleVarKey,
} from '@/components/utils/Ripple';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from '@/components/utils/Elevation';
import type {
  IFocusRingStyleKey,
  IFocusRingStyleVarKey,
} from '@/components/utils/FocusRing';
import type {
  IButtonStyleKey,
  IButtonStyleVarKey,
} from '@/components/atoms/Button';
import type {
  ICircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey,
  IIndeterminateCircularProgressIndicatorStyleKey,
  IDeterminateCircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';
import type { IChipStyleKey, IChipStyleVarKey } from '@/components/atoms/Chip';
import type { IFabStyleKey, IFabStyleVarKey } from '@/components/atoms/Fab';
import type {
  IIconButtonStyleKey,
  IIconButtonStyleVarKey,
} from '@/components/atoms/IconButton';
import type {
  ISwitchStyleKey,
  ISwitchStyleVarKey,
} from '@/components/atoms/Switch';
import type { IFieldStyleKey } from '@/components/atoms/Field';
import type {
  ITextFieldStyleKey,
  ITextFieldStyleVarKey,
} from '@/components/atoms/TextField';
import type {
  IRadioStyleKey,
  IRadioStyleVarKey,
} from '@/components/atoms/Radio';
import type {
  ICheckboxStyleKey,
  ICheckboxStyleVarKey,
} from '@/components/atoms/Checkbox';
import type { IItemStyleKey, IItemStyleVarKey } from '@/components/atoms/Item';
import type { IListStyleKey, IListStyleVarKey } from '@/components/atoms/List';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IIconStyleKey, IIconStyleVarKey } from '@/components/atoms/Icon';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from '@/components/atoms/Divider';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
} from '@/components/atoms/Paper';
import type { ICardStyleKey, ICardStyleVarKey } from '@/components/atoms/Card';
import type { ITabStyleKey, ITabStyleVarKey } from '@/components/atoms/Tab';
import type { ITabListStyleKey } from '@/components/atoms/TabList';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import type {
  IBreadcrumbsStyleKey,
  IBreadcrumbsStyleVarKey,
} from '@/components/atoms/Breadcrumbs';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import type {
  IBadgeStyleKey,
  IBadgeStyleVarKey,
} from '@/components/atoms/Badge';
import type {
  IAvatarStyleKey,
  IAvatarStyleVarKey,
} from '@/components/atoms/Avatar';

export interface ITemplateTheme {
  vars?: IStyleVarsTheme<ITemplateStyleVarKey>;
  styles?: ICompiledStyles<ITemplateStyleKey>;
}

export interface IButtonTheme {
  vars?: IStyleVarsTheme<IButtonStyleVarKey>;
  styles?: ICompiledStyles<IButtonStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
}

export interface IChipTheme {
  vars?: IStyleVarsTheme<IChipStyleVarKey>;
  styles?: ICompiledStyles<IChipStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  trailingActionFocusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  trailingActionRippleStyles?: ICompiledStyles<IRippleStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
}

export interface IChipVariantTheme extends IChipTheme {
  rippleTheme?: IStyleVarsTheme<IRippleStyleVarKey>;
}

export interface IFabTheme {
  vars?: IStyleVarsTheme<IFabStyleVarKey>;
  styles?: ICompiledStyles<IFabStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
}

export interface IFabVariantTheme extends IFabTheme {}

export interface IIconButtonTheme {
  vars?: IStyleVarsTheme<IIconButtonStyleVarKey>;
  styles?: ICompiledStyles<IIconButtonStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
}

export interface IFieldTheme {
  vars?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<IFieldStyleKey>;
}

export interface ITextFieldTheme {
  vars?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<ITextFieldStyleKey>;
  fieldStyles?: ICompiledStyles<IFieldStyleKey>;
}

export interface IPaperTheme {
  vars?: IStyleVarsTheme<IPaperStyleVarKey>;
  styles?: ICompiledStyles<IPaperStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
}

export interface ICardTheme {
  vars?: IStyleVarsTheme<ICardStyleVarKey>;
  styles?: ICompiledStyles<ICardStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
}

export interface ITabTheme {
  vars?: IStyleVarsTheme<ITabStyleVarKey>;
  styles?: ICompiledStyles<ITabStyleKey>;
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
}

export interface ITheme {
  name: string;
  colorSchemes: {
    dark: IStyleVarsTheme<keyof IColorRoles>;
  };
  components: {
    Template: ITemplateTheme;
    VariantTemplate: ITemplateTheme;
    ComponentShowcase: {
      vars: IStyleVarsTheme<IComponentShowcaseStyleVarKey>;
      styles: ICompiledStyles<IComponentShowcaseStyleKey>;
    };
    Placeholder: {
      vars: IStyleVarsTheme<IPlaceholderStyleVarKey>;
      styles: ICompiledStyles<IPlaceholderStyleKey>;
    };
    Ripple: {
      vars: IStyleVarsTheme<IRippleStyleVarKey>;
      styles: ICompiledStyles<IRippleStyleKey>;
    };
    Elevation: {
      vars: IStyleVarsTheme<IElevationStyleVarKey>;
      styles: ICompiledStyles<IElevationStyleKey>;
    };
    FocusRing: {
      vars: IStyleVarsTheme<IFocusRingStyleVarKey>;
      styles: ICompiledStyles<IFocusRingStyleKey>;
    };
    ButtonBase: IButtonTheme;
    Button: IButtonTheme;
    ElevatedButton: IButtonTheme;
    FilledButton: IButtonTheme;
    FilledTonalButton: IButtonTheme;
    OutlinedButton: IButtonTheme;
    TextButton: IButtonTheme;
    CircularProgressIndicator: {
      vars: IStyleVarsTheme<ICircularProgressIndicatorStyleVarKey>;
      styles: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    IndeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IIndeterminateCircularProgressIndicatorStyleKey>;
    };
    DeterminateCircularProgressIndicator: {
      styles: ICompiledStyles<IDeterminateCircularProgressIndicatorStyleKey>;
    };
    Chip: IChipTheme;
    AssistChip: IChipTheme;
    FilterChip: IChipTheme;
    InputChip: IChipTheme;
    SuggestionChip: IChipTheme;
    Fab: IFabTheme;
    SurfaceFab: IFabTheme;
    PrimaryFab: IFabTheme;
    SecondaryFab: IFabTheme;
    TertiaryFab: IFabTheme;
    BrandedFab: IFabTheme;
    IconButton: IIconButtonTheme;
    StandardIconButton: IIconButtonTheme;
    FilledIconButton: IIconButtonTheme;
    FilledTonalIconButton: IIconButtonTheme;
    OutlinedIconButton: IIconButtonTheme;
    Switch: {
      vars: IStyleVarsTheme<ISwitchStyleVarKey>;
      styles: ICompiledStyles<ISwitchStyleKey>;
      rippleStyles?: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    Field: IFieldTheme;
    FilledField: IFieldTheme;
    OutlinedField: IFieldTheme;
    TextField: ITextFieldTheme;
    FilledTextField: ITextFieldTheme;
    OutlinedTextField: ITextFieldTheme;
    Radio: {
      vars?: IStyleVarsTheme<IRadioStyleVarKey>;
      styles?: ICompiledStyles<IRadioStyleKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Checkbox: {
      vars?: IStyleVarsTheme<ICheckboxStyleVarKey>;
      styles?: ICompiledStyles<ICheckboxStyleKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Item: {
      vars?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IItemStyleKey>;
    };
    ListItem: {
      vars?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IListItemStyleKey>;
      itemStyles?: ICompiledStyles<IItemStyleKey>;
      rippleStyles: ICompiledStyles<IRippleStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    List: {
      vars?: IStyleVarsTheme<IListStyleVarKey>;
      styles?: ICompiledStyles<IListStyleKey>;
    };
    Icon: {
      vars?: IStyleVarsTheme<IIconStyleVarKey>;
      styles?: ICompiledStyles<IIconStyleKey>;
    };
    Divider: {
      vars?: IStyleVarsTheme<IDividerStyleVarKey>;
      styles?: ICompiledStyles<IDividerStyleKey>;
    };
    Paper: IPaperTheme;
    FilledPaper: IPaperTheme;
    OutlinedPaper: IPaperTheme & {
      styles?: ICompiledStyles<IPaperStyleKey>;
    };
    Card: ICardTheme;
    ElevatedCard: ICardTheme;
    FilledCard: ICardTheme;
    OutlinedCard: ICardTheme & {
      styles?: ICompiledStyles<ICardStyleKey>;
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
    Breadcrumbs: {
      vars?: IStyleVarsTheme<IBreadcrumbsStyleVarKey>;
      styles?: ICompiledStyles<IBreadcrumbsStyleKey>;
      expandButtonStyles?: ICompiledStyles<IButtonStyleKey>;
      expandButtonFocusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Anchored: {
      styles?: ICompiledStyles<IAnchoredStyleKey>;
    };
    Badge: {
      vars?: IStyleVarsTheme<IBadgeStyleVarKey>;
      styles?: ICompiledStyles<IBadgeStyleKey>;
    };
    Avatar: {
      vars?: IStyleVarsTheme<IAvatarStyleVarKey>;
      styles?: ICompiledStyles<IAvatarStyleKey>;
    };
  };
}
