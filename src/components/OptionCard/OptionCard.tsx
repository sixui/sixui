import { forwardRef, useContext, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IOptionCardOwnProps, IOptionCardProps } from './OptionCard.types';
import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { isFunction } from '@/helpers/isFunction';
import { CardContent } from '@/components/CardContent';
import { Card } from '@/components/Card';
import { ElementWithLabel } from '@/components/ElementWithLabel';
import { useControlledValue } from '@/hooks/useControlledValue';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { RadioGroupContext } from '@/components/RadioGroup';
import { commonStyles } from '@/helpers/commonStyles';
import { optionCardCardStyles, optionCardStyles } from './OptionCard.styles';
import { optionCardTheme } from './OptionCard.stylex';

type IOptionCard = <TRoot extends React.ElementType>(
  props: IOptionCardProps<TRoot>,
) => React.ReactNode;

export const OptionCard: IOptionCard = forwardRef(function OptionCard<
  TRoot extends React.ElementType,
>(props: IOptionCardProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component,
    styles,
    sx,
    innerStyles,
    label,
    supportingText,
    checked: checkedProp,
    defaultChecked,
    children,
    onChange,
    ...other
  } = props as IWithAsProp<IOptionCardOwnProps>;
  const radioGroupContext = useContext(RadioGroupContext);

  const { overridenStyles } = useComponentTheme('OptionCard');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(optionCardStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const controlRef = useRef<HTMLInputElement>(null);
  const controlHandleRef = useMergeRefs([controlRef, forwardedRef]);
  const [checkedValue, setCheckedValue] = useControlledValue({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'OptionCard',
  });
  const checked = radioGroupContext
    ? radioGroupContext.value === other.value
    : checkedValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setCheckedValue(event.target.checked);
    onChange?.(event, event.target.checked ? event.target.value : undefined);
  };

  return (
    <Card
      variant='outlined'
      onClick={() => controlRef.current?.click()}
      disabled={other.disabled}
      sx={[
        optionCardTheme,
        overridenStyles,
        stylesCombinator('host'),
        checked && stylesCombinator('host$selected'),
        sx,
      ]}
      styles={[optionCardCardStyles, ...asArray(innerStyles?.card)]}
    >
      {Component ? null : (
        <input
          ref={controlHandleRef}
          type='checkbox'
          onChange={handleChange}
          checked={checkedValue}
          tabIndex={-1}
          hidden
        />
      )}

      <CardContent sx={commonStyles.gap$md}>
        <ElementWithLabel
          orientation='horizontal'
          label={label}
          supportingText={supportingText}
          disabled={other.disabled}
        >
          {Component ? (
            <Component
              {...other}
              ref={controlHandleRef}
              onChange={handleChange}
              checked={checked}
              tabIndex={-1}
            />
          ) : null}
        </ElementWithLabel>
        {children ? (
          <div {...sxf(['text', other.disabled && 'text$disabled'])}>
            {isFunction(children) ? children({ checked }) : children}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
});
