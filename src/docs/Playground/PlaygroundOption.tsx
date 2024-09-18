import { accumulate } from '@olivierpascal/helpers';

import type { ILabeledRenderProps } from '~/components/Labeled';
import type { IPlaygroundOption } from './Playground.types';
import type { IPlaygroundOptionProps } from './PlaygroundOption.types';
import { Checkbox } from '~/components/Checkbox';
import { HtmlSelect } from '~/components/HtmlSelect';
import { Labeled } from '~/components/Labeled';
import { Stack } from '~/components/Stack';
import { TextInputField } from '~/components/TextInputField';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';

export const PlaygroundOption = fixedForwardRef(function PlaygroundOption<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundOptionProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { option, onChange, sectionKey, sectionsProps, ...other } = props;

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
          value={
            input?.value ??
            (sectionsProps[sectionKey][input.targetProp] as string) ??
            ''
          }
          onChange={(event) =>
            option.input ? handleValueChange(event.target.value) : undefined
          }
        />
      ) : (
        <TextInputField
          {...elementProps}
          value={input?.value ?? ''}
          onChange={(event) =>
            option.input ? handleValueChange(event?.target.value) : undefined
          }
        />
      );
    } else if (input.type === 'number') {
      return (
        <TextInputField
          {...elementProps}
          value={input?.value ?? ''}
          onChange={(event) =>
            option.input ? handleValueChange(event?.target.value) : undefined
          }
          type="number"
          min={input.min}
          max={input.max}
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
    <Stack gap={2} {...other} ref={forwardedRef}>
      <Labeled
        label={option.label}
        labelPosition={modifiers?.required ? 'top' : 'right'}
        supportingText={option.supportingText}
        required={modifiers?.required}
        disabled={modifiers?.disabled}
      >
        {modifiers?.required ? (
          renderInputField(option, {
            disabled:
              modifiers.disabled || (!modifiers.required && !modifiers.on),
          })
        ) : (
          <Checkbox
            checked={!!modifiers?.on}
            onChange={(_event, checked) =>
              onChange({
                ...option,
                modifiers: {
                  ...option.modifiers,
                  on: !!checked,
                },
              })
            }
          />
        )}
      </Labeled>

      {modifiers?.required
        ? null
        : renderInputField(option, {
            disabled:
              modifiers?.disabled || (!modifiers?.required && !modifiers?.on),
          })}
    </Stack>
  );
});
