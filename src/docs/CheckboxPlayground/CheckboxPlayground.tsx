import type { IPlaygroundSections } from '~/docs/Playground';
import type { ICheckboxPlaygroundDemoProps } from './CheckboxPlaygroundDemo';
import { labeledPlaygroundSections } from '~/docs/LabeledPlayground';
import { Playground } from '~/docs/Playground';
import { CheckboxPlaygroundDemo } from './CheckboxPlaygroundDemo';

export const checkboxPlaygroundSections: IPlaygroundSections<ICheckboxPlaygroundDemoProps> =
  {
    checkbox: {
      title: 'Props',
      options: [
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
      ],
    },
    ...labeledPlaygroundSections,
  };

export const CheckboxPlayground: React.FC = (props) => {
  return (
    <Playground<ICheckboxPlaygroundDemoProps>
      {...props}
      defaultSections={checkboxPlaygroundSections}
      componentRenderer={(props) => <CheckboxPlaygroundDemo {...props} />}
      initialProps={{
        labeled: {
          labelPosition: 'right',
        },
      }}
    />
  );
};
