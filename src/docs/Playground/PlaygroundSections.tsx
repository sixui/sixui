import type { IPlaygroundSectionsProps } from './PlaygroundSections.types';
import type {
  IPlaygroundOption,
  IPlaygroundSections,
} from './Playground.types';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { Disclosure } from '~/components/Disclosure';
import { DisclosureButton } from '~/components/DisclosureButton';
import { Stack } from '~/components/Stack';
import { PlaygroundOption } from './PlaygroundOption';

export const PlaygroundSections = fixedForwardRef(function PlaygroundSections<
  TSectionsProps extends Record<string, object>,
>(
  props: IPlaygroundSectionsProps<TSectionsProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { sections, onSectionsChange, sectionsProps, ...other } = props;

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
    <Stack gap={4}>
      {section.options.map((option, optionIndex) => (
        <PlaygroundOption<TSectionsProps>
          key={optionIndex}
          option={option}
          onChange={(newOption) => handleOptionChange(option, newOption)}
          sectionKey={sectionKey}
          sectionsProps={sectionsProps}
        />
      ))}
    </Stack>
  );

  return (
    <Stack {...other} gap={6} ref={forwardedRef}>
      {Object.keys(sections).map((key, sectionIndex) => {
        const sectionKey = key as keyof TSectionsProps;
        const section = sections[sectionKey];

        return (
          <Disclosure
            trigger={<DisclosureButton>{section.title}</DisclosureButton>}
            defaultExpanded={sectionIndex === 0}
            key={sectionIndex}
          >
            {renderSection(section, sectionKey)}
          </Disclosure>
        );
      })}
    </Stack>
  );
});
