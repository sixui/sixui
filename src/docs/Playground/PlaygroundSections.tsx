import stylex from '@stylexjs/stylex';

import type { IPlaygroundSectionsProps } from './PlaygroundSections.types';
import type {
  IPlaygroundOption,
  IPlaygroundSections,
} from './Playground.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { commonStyles } from '~/helpers/commonStyles';
import { Typography } from '~/components/Typography';
import { PlaygroundOption } from './PlaygroundOption';

export const PlaygroundSections = fixedForwardRef(function PlaygroundSections<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundSectionsProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { sx, sections, onSectionsChange, sectionsProps, ...other } = props;

  const componentTheme = useComponentTheme('PlaygroundOptions');

  const handleOptionChange = (
    targetOption: IPlaygroundOption<TSectionsProps>,
    newOption: IPlaygroundOption<TSectionsProps>,
  ): void =>
    onSectionsChange?.(
      Object.keys(sections).reduce((acc, sectionKey) => {
        const section = sections[sectionKey];

        return {
          ...acc,
          [sectionKey]: {
            ...section,
            options: section.options.map((option) =>
              option === targetOption ? newOption : option,
            ),
          },
        };
      }, {} as IPlaygroundSections<TSectionsProps>),
    );

  return (
    <div
      {...stylex.props(
        componentTheme.overridenStyles,
        commonStyles.verticalLayout,
        commonStyles.gap$2xl,
        sx,
      )}
      {...other}
      ref={forwardedRef}
    >
      {Object.keys(sections).map((sectionKey, sectionIndex) => {
        const section = sections[sectionKey as keyof TSectionsProps];

        return (
          <div
            {...stylex.props(commonStyles.verticalLayout)}
            key={sectionIndex}
          >
            {section.title ? (
              <Typography variant='title'>{section.title}</Typography>
            ) : null}
            <div
              {...stylex.props(
                commonStyles.verticalLayout,
                commonStyles.gap$xl,
              )}
            >
              {section.options.map((option, optionIndex) => (
                <PlaygroundOption<TSectionsProps>
                  key={optionIndex}
                  option={option}
                  onChange={(newOption) =>
                    handleOptionChange(option, newOption)
                  }
                  sectionKey={sectionKey}
                  sectionsProps={sectionsProps}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});
