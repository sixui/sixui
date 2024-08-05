import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  FilterChipPlaygroundDemo,
  type IFilterChipPlaygroundDemoProps,
} from './FilterChipPlaygroundDemo';

export const chipPlaygroundSections: IPlaygroundSections<IFilterChipPlaygroundDemoProps> =
  {
    filterChip: {
      title: 'Filter Chip',
      props: {
        onClick: () => {},
      },
      options: [
        {
          label: 'Label',
          input: {
            type: 'string',
            value: 'Private bathroom',
            targetProp: 'label',
          },
          modifiers: {
            required: true,
          },
        },
        {
          label: 'Selected',
          props: {
            selected: true,
          },
        },
        {
          label: 'Elevated',
          props: {
            elevated: true,
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
            disabled: !sectionProps?.filterChip.loading,
          }),
        },
      ],
    },
  };

export const FilterChipPlayground: React.FC = (props) => {
  return (
    <Playground<IFilterChipPlaygroundDemoProps>
      {...props}
      defaultSections={chipPlaygroundSections}
      componentRenderer={(props) => <FilterChipPlaygroundDemo {...props} />}
    />
  );
};
