import { forwardRef, useContext, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { CardContent } from '@/components/atoms/CardContent';
import { Card } from '@/components/atoms/Card';
import {
  type IOptionCardOwnProps,
  type IOptionCardProps,
} from './OptionCardProps';
import { ElementWithLabel } from '@/components/molecules/ElementWithLabel';
import { useControlledValue } from '@/hooks/useControlledValue';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import {
  IOptionCardStyleKey,
  IOptionCardStyleVarKey,
} from './OptionCard.styledefs';
import { RadioGroupContext } from '@/components/atoms/RadioGroup';

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
    label,
    supportingText,
    checked: checkedProp,
    defaultChecked,
    children,
    onChange,
    ...other
  } = props as IWithAsProp<IOptionCardOwnProps>;
  const radioGroupContext = useContext(RadioGroupContext);

  const { theme } = useComponentTheme('OptionCard');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IOptionCardStyleKey, IOptionCardStyleVarKey>(
        stylesCombinator,
      ),
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
      styles={[theme.styles, theme.cardStyles, ...asArray(styles)]}
      sx={[
        stylesCombinator('host'),
        checked && stylesCombinator('host$selected'),
        theme.vars,
        sx,
      ]}
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

      <CardContent>
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
            {children}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
});
