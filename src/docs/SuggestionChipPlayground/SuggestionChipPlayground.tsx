import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  SuggestionChipPlaygroundDemo,
  type ISuggestionChipPlaygroundDemoProps,
} from './SuggestionChipPlaygroundDemo';

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
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Loading',
          props: {
            loading: true,
          },
          modifiers: {
            off: true,
          },
        },
        {
          label: 'Loading text',
          input: {
            type: 'string',
            value: 'Wait...',
            targetProp: 'loadingText',
          },
          modifiers: {
            off: true,
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
