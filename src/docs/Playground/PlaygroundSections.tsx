import stylex from '@stylexjs/stylex';

import type { IPlaygroundSectionsProps } from './PlaygroundSections.types';
import type {
  IPlaygroundOption,
  IPlaygroundSections,
} from './Playground.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { commonStyles } from '~/helpers/commonStyles';
import { Disclosure } from '~/components/Disclosure';
import { DisclosureButton } from '~/components/DisclosureButton';
import { PlaygroundOption } from './PlaygroundOption';
import { playgroundOptionDisclosureButtonStyles } from './PlaygroundSections.styles';

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

  const renderSection = (
    section: IPlaygroundSections<TSectionsProps>[keyof TSectionsProps],
    sectionKey: keyof TSectionsProps,
  ): JSX.Element => (
    <div {...stylex.props(commonStyles.verticalLayout, commonStyles.gap$xl)}>
      {section.options.map((option, optionIndex) => (
        <PlaygroundOption<TSectionsProps>
          key={optionIndex}
          option={option}
          onChange={(newOption) => handleOptionChange(option, newOption)}
          sectionKey={sectionKey}
          sectionsProps={sectionsProps}
        />
      ))}
    </div>
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
      {Object.keys(sections).map((key, sectionIndex) => {
        const sectionKey = key as keyof TSectionsProps;
        const section = sections[sectionKey];

        return (
          <Disclosure
            trigger={
              <DisclosureButton styles={playgroundOptionDisclosureButtonStyles}>
                {section.title}
              </DisclosureButton>
            }
            defaultExpanded={sectionIndex === 0}
            key={sectionIndex}
          >
            {renderSection(section, sectionKey)}
          </Disclosure>
        );
      })}
    </div>
  );
});
