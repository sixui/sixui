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
import type { IFieldBaseStyleKey } from '@/components/atoms/FieldBase';
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
import type { IListStyleKey } from '@/components/atoms/List';
import type {
  IListItemStyleKey,
  IListItemStyleVarKey,
} from '@/components/atoms/ListItem';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from '@/components/atoms/Divider';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
} from '@/components/atoms/Paper';
import type { ICardStyleKey, ICardStyleVarKey } from '@/components/atoms/Card';
import type {
  ICardMediaStyleKey,
  ICardMediaStyleVarKey,
} from '@/components/atoms/CardMedia';
import type {
  ICardContentStyleKey,
  ICardContentStyleVarKey,
} from '@/components/atoms/CardContent';
import type {
  ICardTitleStyleKey,
  ICardTitleStyleVarKey,
} from '@/components/atoms/CardTitle';
import type { ICardActionsStyleKey } from '@/components/atoms/CardActions';
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
import type {
  IScrimStyleKey,
  IScrimStyleVarKey,
} from '@/components/atoms/Scrim';
import type {
  IDialogStyleKey,
  IDialogStyleVarKey,
} from '@/components/atoms/Dialog';
import type {
  IMenuListStyleKey,
  IMenuListStyleVarKey,
} from '@/components/atoms/MenuList';
import type {
  IDisclosureStyleKey,
  IDisclosureStyleVarKey,
} from '@/components/atoms/Disclosure';

export type ITemplateTheme = {
  vars?: IStyleVarsTheme<ITemplateStyleVarKey>;
  styles?: ICompiledStyles<ITemplateStyleKey>;
};

export type IButtonTheme = {
  vars?: IStyleVarsTheme<IButtonStyleVarKey>;
  styles?: ICompiledStyles<IButtonStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
};

export type IChipTheme = {
  vars?: IStyleVarsTheme<IChipStyleVarKey>;
  styles?: ICompiledStyles<IChipStyleKey>;
  stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  trailingActionFocusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  trailingActionStateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
};

export type IChipVariantTheme = IChipTheme & {
  statelayerTheme?: IStyleVarsTheme<IStateLayerStyleVarKey>;
};

export type IFabTheme = {
  vars?: IStyleVarsTheme<IFabStyleVarKey>;
  styles?: ICompiledStyles<IFabStyleKey>;
};

export type IFabVariantTheme = IFabTheme;

export type IIconButtonTheme = {
  vars?: IStyleVarsTheme<IIconButtonStyleVarKey>;
  styles?: ICompiledStyles<IIconButtonStyleKey>;
};

export type IFieldTheme = {
  vars?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<IFieldBaseStyleKey>;
};

export type ITextFieldTheme = {
  vars?: IStyleVarsTheme<ITextFieldStyleVarKey>;
  styles?: ICompiledStyles<ITextFieldStyleKey>;
  fieldStyles?: ICompiledStyles<IFieldBaseStyleKey>;
};

export type IPaperTheme = {
  vars?: IStyleVarsTheme<IPaperStyleVarKey>;
  styles?: ICompiledStyles<IPaperStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
};

export type ICardTheme = {
  vars?: IStyleVarsTheme<ICardStyleVarKey>;
  styles?: ICompiledStyles<ICardStyleKey>;
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
    dark: IStyleVarsTheme<keyof IColorRoles>;
  };
  colorRoles: {
    dark: IColorRoles;
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
      stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
      circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
    };
    FieldBase: IFieldTheme;
    FilledFieldBase: IFieldTheme;
    OutlinedFieldBase: IFieldTheme;
    Field: {
      styles?: ICompiledStyles<IFieldStyleKey>;
    };
    TextField: ITextFieldTheme;
    FilledTextField: ITextFieldTheme;
    OutlinedTextField: ITextFieldTheme;
    Radio: {
      vars?: IStyleVarsTheme<IRadioStyleVarKey>;
      styles?: ICompiledStyles<IRadioStyleKey>;
      stateLayerStyles: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Checkbox: {
      vars?: IStyleVarsTheme<ICheckboxStyleVarKey>;
      styles?: ICompiledStyles<ICheckboxStyleKey>;
      stateLayerStyles: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    Item: {
      vars?: IStyleVarsTheme<IItemStyleVarKey>;
      styles?: ICompiledStyles<IItemStyleKey>;
    };
    ListItem: {
      vars?: IStyleVarsTheme<IListItemStyleVarKey>;
      styles?: ICompiledStyles<IListItemStyleKey>;
      itemStyles?: ICompiledStyles<IItemStyleKey>;
      stateLayerStyles: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles: ICompiledStyles<IFocusRingStyleKey>;
    };
    List: {
      styles?: ICompiledStyles<IListStyleKey>;
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
    Card: ICardTheme & {
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      stateLayerStyles?: ICompiledStyles<IStateLayerStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
    };
    CardHeader: {
      vars?: IStyleVarsTheme<IItemStyleVarKey>;
    };
    CardMedia: {
      vars: IStyleVarsTheme<ICardMediaStyleVarKey>;
      styles?: ICompiledStyles<ICardMediaStyleKey>;
    };
    CardContent: {
      vars: IStyleVarsTheme<ICardContentStyleVarKey>;
      styles?: ICompiledStyles<ICardContentStyleKey>;
    };
    CardTitle: {
      vars: IStyleVarsTheme<ICardTitleStyleVarKey>;
      styles?: ICompiledStyles<ICardTitleStyleKey>;
    };
    CardActions: {
      styles?: ICompiledStyles<ICardActionsStyleKey>;
    };
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
    Scrim: {
      vars?: IStyleVarsTheme<IScrimStyleVarKey>;
      styles?: ICompiledStyles<IScrimStyleKey>;
    };
    Dialog: {
      vars?: IStyleVarsTheme<IDialogStyleVarKey>;
      styles?: ICompiledStyles<IDialogStyleKey>;
    };
    MenuList: {
      vars?: IStyleVarsTheme<IMenuListStyleVarKey>;
      styles?: ICompiledStyles<IMenuListStyleKey>;
      elevationStyles?: ICompiledStyles<IElevationStyleKey>;
      focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
    };
    Disclosure: {
      vars?: IStyleVarsTheme<IDisclosureStyleVarKey>;
      styles?: ICompiledStyles<IDisclosureStyleKey>;
    };
  };
};
