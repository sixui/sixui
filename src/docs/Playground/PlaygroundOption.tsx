import stylex from '@stylexjs/stylex';
import { accumulate } from '@olivierpascal/helpers';

import type { IPlaygroundOptionProps } from './PlaygroundOption.types';
import type { IPlaygroundOption } from './Playground.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { TextInputField } from '~/components/TextInputField';
import { Labeled, type ILabeledRenderProps } from '~/components/Labeled';
import { Checkbox } from '~/components/Checkbox';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { commonStyles } from '~/helpers/commonStyles';
import { HtmlSelect } from '~/components/HtmlSelect';
import { playgroundOptionFieldBaseStyles } from './PlaygroundOption.styles';

export const PlaygroundOption = fixedForwardRef(function PlaygroundOption<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundOptionProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { sx, sectionsProps, option, onChange, ...other } = props;

  const componentTheme = useComponentTheme('PlaygroundOption');

  const handleValueChange = (value: unknown): void =>
    onChange({
      ...option,
      input: option.input
        ? ({
            ...option.input,
            value,
          } as typeof option.input)
        : undefined,
    });

  const renderInputField = (
    option: IPlaygroundOption<TSectionsProps>,
    elementProps?: Partial<ILabeledRenderProps>,
  ): React.ReactNode => {
    const { input } = option;
    if (!input) {
      return null;
    }

    if (input.type === 'string') {
      return input.items ? (
        <HtmlSelect
          {...elementProps}
          items={input.items}
          innerStyles={{
            fieldBase: playgroundOptionFieldBaseStyles,
          }}
          value={input?.value ?? ''}
          onChange={(event) =>
            option.input ? handleValueChange(event.target.value) : undefined
          }
        />
      ) : (
        <TextInputField
          {...elementProps}
          innerStyles={{
            fieldBase: playgroundOptionFieldBaseStyles,
          }}
          value={input?.value ?? ''}
          onChange={(event) =>
            option.input ? handleValueChange(event?.target.value) : undefined
          }
        />
      );
    }
  };

  const modifiers = accumulate(
    option.getModifiers?.(sectionsProps) ?? {},
    option.modifiers,
  );

  if (modifiers?.hidden) {
    return null;
  }

  return (
    <div
      {...stylex.props(
        componentTheme.overridenStyles,
        commonStyles.verticalLayout,
        commonStyles.gap$xl,
        sx,
      )}
      {...other}
      ref={forwardedRef}
    >
      <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$sm)}>
        <Labeled
          label={option.label}
          sx={modifiers?.required ? commonStyles.gap$sm : undefined}
          labelPosition={modifiers?.required ? 'top' : 'right'}
          supportingText={option.supportingText}
          required={modifiers?.required}
          disabled={modifiers?.disabled}
        >
          {modifiers?.required ? (
            renderInputField(option, {
              disabled: modifiers.disabled || modifiers.off,
            })
          ) : (
            <Checkbox
              checked={!modifiers?.off}
              onChange={(_event, checked) =>
                onChange({
                  ...option,
                  modifiers: {
                    ...option.modifiers,
                    off: !checked,
                  },
                })
              }
            />
          )}
        </Labeled>

        {modifiers?.required
          ? null
          : renderInputField(option, {
              disabled: modifiers?.disabled || modifiers?.off,
            })}
      </div>
    </div>
  );
});
