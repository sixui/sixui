import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { labeledPlaygroundSections } from '~/docs/LabeledPlayground';
import {
  CheckboxPlaygroundDemo,
  type ICheckboxPlaygroundDemoProps,
} from './CheckboxPlaygroundDemo';

export const checkboxPlaygroundSection: IPlaygroundSections<ICheckboxPlaygroundDemoProps> =
  {
    checkbox: {
      title: 'Props',
      options: [
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
      ],
    },
    labeled: labeledPlaygroundSections.labeled,
  };

export const CheckboxPlayground: React.FC = (props) => {
  return (
    <Playground<ICheckboxPlaygroundDemoProps>
      {...props}
      defaultSections={checkboxPlaygroundSection}
      componentRenderer={(props) => <CheckboxPlaygroundDemo {...props} />}
      initialProps={{
        labeled: {
          labelPosition: 'right',
        },
      }}
    />
  );
};
