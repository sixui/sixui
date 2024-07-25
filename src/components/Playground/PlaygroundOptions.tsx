import { useMemo, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IPlaygroundOptionsProps } from './PlaygroundOptions.types';
import type { IPlaygroundOption, IPlaygroundOptions } from './Playground.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { TextInputField } from '@/components/TextInputField';
import {
  ElementWithLabel,
  IElementWithLabelRenderProps,
} from '@/components/ElementWithLabel';
import { Switch } from '@/components/Switch';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';
import { commonStyles } from '@/helpers/commonStyles';
import { playgroundOptionsStyles } from './PlaygroundOptions.styles';

export const PlaygroundOptions = fixedForwardRef(function PlaygroundOptions<
  TComponentProps extends Record<string, unknown>,
>(
  props: IPlaygroundOptionsProps<TComponentProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const {
    styles,
    sx,
    options: optionsProp,
    onComponentPropsChange,
    ...other
  } = props;

  const componentTheme = useComponentTheme('PlaygroundOptions');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(playgroundOptionsStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [options, setOptions] = useState<IPlaygroundOptions>(optionsProp);

  const handleChange = (propName: string, value: unknown): void => {
    const optionsEntries = Object.entries(options) as Array<
      [keyof TComponentProps, IPlaygroundOption]
    >;
    const defaultComponentProps = optionsEntries.reduce(
      (acc, [propName, option]) => {
        if (option.modifiers?.disabled) {
          return acc;
        }

        return {
          ...acc,
          [propName]: option.defaultValue,
        };
      },
      {} as TComponentProps,
    );

    setComponentProps(newValues);
    onComponentPropsChange?.(newValues);
  };

  const optionsEntries = Object.entries<IPlaygroundOption>(options);

  const renderOptionField = (
    propName: string,
    option: IPlaygroundOption,
    elementProps?: IElementWithLabelRenderProps,
  ): React.ReactNode =>
    option.type === 'string' ? (
      <TextInputField
        {...elementProps}
        value={(componentProps[propName] ?? '') as string}
        onChange={(event) => handleChange(propName, event.target.value)}
      />
    ) : (
      'boo'
    );

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      {optionsEntries.map(([propName, option], optionIndex) =>
        !option.modifiers?.hidden ? (
          <div {...stylex.props(commonStyles.verticalLayout)} key={optionIndex}>
            <ElementWithLabel
              label={option.label}
              orientation={
                option.modifiers?.toggleable ? 'horizontal' : 'vertical'
              }
              supportingText={option.supportingText}
              required={option.modifiers?.required}
              disabled={option.modifiers?.disabled}
            >
              {(elementProps) =>
                option.modifiers?.toggleable ? (
                  <Switch {...elementProps} />
                ) : (
                  renderOptionField(propName, option, elementProps)
                )
              }
            </ElementWithLabel>

            {option.modifiers?.toggleable
              ? renderOptionField(propName, option)
              : null}
          </div>
        ) : null,
      )}
    </div>
  );
});
