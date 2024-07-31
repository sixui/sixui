import stylex from '@stylexjs/stylex';

import type { IPlaygroundSectionsProps } from './PlaygroundSections.types';
import type { IPlaygroundOption } from './Playground.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { commonStyles } from '~/helpers/commonStyles';
import { Typography } from '~/components/Typography';
import { PlaygroundOption } from './PlaygroundOption';

export const PlaygroundSections = fixedForwardRef(function PlaygroundSections<
  TComponentProps extends object,
>(
  props: IPlaygroundSectionsProps<TComponentProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { sx, sections, onSectionsChange, componentProps, ...other } = props;

  const componentTheme = useComponentTheme('PlaygroundOptions');

  const handleOptionChange = (
    targetOption: IPlaygroundOption<TComponentProps>,
    newOption: IPlaygroundOption<TComponentProps>,
  ): void =>
    onSectionsChange?.(
      sections.map((section) => ({
        ...section,
        options: section.options.map((option) =>
          option === targetOption ? newOption : option,
        ),
      })),
    );

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
      {sections.map((section, sectionIndex) => (
        <div {...stylex.props(commonStyles.verticalLayout)} key={sectionIndex}>
          {section.title ? (
            <Typography variant='title'>{section.title}</Typography>
          ) : null}
          <div
            {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$xl)}
          >
            {section.options.map((option, optionIndex) => (
              <PlaygroundOption
                key={optionIndex}
                option={option}
                onChange={(newOption) => handleOptionChange(option, newOption)}
                componentProps={componentProps}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
