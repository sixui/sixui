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
import { Labeled } from '../Labeled';
import { RadioGroupContext } from '../RadioGroup';
import { optionCardCardStyles, optionCardStyles } from './OptionCard.styles';
import { optionCardTheme } from './OptionCard.stylex';

export const OptionCard = createPolymorphicComponent<'div', IOptionCardProps>(
  forwardRef<HTMLDivElement, IOptionCardProps>(
    function OptionCard(props, forwardedRef) {
      const {
        component: Component,
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
      } = props as IWithAsProp<IOptionCardProps>;
      const radioGroupContext = useContext(RadioGroupContext);

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'OptionCard',
        styles: [optionCardStyles, styles],
      });

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
          disabled={other.disabled}
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

          <CardContent sx={combineStyles('cardContent')}>
            <Labeled
              labelPosition='right'
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
            </Labeled>
            {children ? (
              <div {...getStyles('text', other.disabled && 'text$disabled')}>
                {isFunction(children) ? children({ checked }) : children}
              </div>
            ) : null}
          </CardContent>
        </Card>
      );
    },
  ),
);
