import type { IPlaygroundSections } from '~/docs/Playground';
import type { ISuggestionChipPlaygroundDemoProps } from './SuggestionChipPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { SuggestionChipPlaygroundDemo } from './SuggestionChipPlaygroundDemo';

export const chipPlaygroundSections: IPlaygroundSections<ISuggestionChipPlaygroundDemoProps> =
  {
    suggestionChip: {
      title: 'Suggestion Chip',
      props: {
        onClick: () => {},
      },
      options: [
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'What song is this?',
            targetProp: 'label',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
        },
        {
          label: 'Loading text',
          input: {
            type: 'string',
            value: 'Wait...',
            targetProp: 'loadingText',
          },
          getModifiers: (sectionProps) => ({
            disabled: !sectionProps?.suggestionChip.loading,
          }),
        },
      ],
    },
  };

export const SuggestionChipPlayground: React.FC = (props) => {
  return (
    <Playground<ISuggestionChipPlaygroundDemoProps>
      {...props}
      defaultSections={chipPlaygroundSections}
      componentRenderer={(props) => <SuggestionChipPlaygroundDemo {...props} />}
    />
  );
};
