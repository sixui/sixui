import { forwardRef, useContext, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IOptionCardProps } from './OptionCard.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { CardContent } from '../CardContent';
import { Card } from '../Card';
import { Labeled, LabeledContext } from '../Labeled';
import { RadioGroupContext } from '../RadioGroup';
import { optionCardCardStyles, optionCardStyles } from './OptionCard.styles';
import { optionCardTheme } from './OptionCard.stylex';

export const OptionCard = createPolymorphicComponent<'div', IOptionCardProps>(
  forwardRef<HTMLDivElement, IOptionCardProps>(
    function OptionCard(props, forwardedRef) {
      const {
        as: Component,
        styles,
        sx,
        innerStyles,
        label,
        supportingText,
        checked: checkedProp,
        defaultChecked,
        readOnly: readOnlyProp,
        children,
        onChange,
        ...other
      } = props as IWithAsProp<IOptionCardProps>;
      const radioGroupContext = useContext(RadioGroupContext);

      const { combineStyles, getStyles, globalStyles } = useStyles({
        componentName: 'OptionCard',
        styles: [optionCardStyles, styles],
      });

      const labeledContext = useContext(LabeledContext);
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
      const readOnly = readOnlyProp || labeledContext?.readOnly;
      const visuallyDisabled =
        other.disabled || labeledContext?.disabled || readOnly;

      const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        event.preventDefault();
        setCheckedValue(event.target.checked);
        onChange?.(
          event,
          event.target.checked ? event.target.value : undefined,
        );
      };

      return (
        <Card
          variant='outlined'
          onClick={() => controlRef.current?.click()}
          disabled={visuallyDisabled}
          sx={[
            optionCardTheme,
            globalStyles,
            combineStyles('host', checked && 'host$selected'),
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

          <CardContent gap={2}>
            <Labeled
              labelPosition='right'
              label={label}
              supportingText={supportingText}
              disabled={visuallyDisabled}
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
            </Labeled>
            {children ? (
              <div {...getStyles('text', visuallyDisabled && 'text$disabled')}>
                {isFunction(children) ? children({ checked }) : children}
              </div>
            ) : null}
          </CardContent>
        </Card>
      );
    },
  ),
);
