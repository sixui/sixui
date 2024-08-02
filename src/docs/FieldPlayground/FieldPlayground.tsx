import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { fieldBasePlaygroundSections } from '~/docs/FieldBasePlayground';
import {
  FieldPlaygroundDemo,
  type IFieldPlaygroundDemoProps,
} from './FieldPlaygroundDemo';

export const fieldPlaygroundSections: IPlaygroundSections<IFieldPlaygroundDemoProps> =
  {
    field: {
      title: 'Field',
      options: [
        {
          label: 'Placeholder',
          input: {
            type: 'string',
            value: 'Placeholder',
            targetProp: 'placeholder',
          },
          modifiers: {
            off: true,
          },
        },
      ],
    },
    ...fieldBasePlaygroundSections,
  };

export const FieldPlayground: React.FC = (props) => {
  return (
    <Playground<IFieldPlaygroundDemoProps>
      {...props}
      defaultSections={fieldPlaygroundSections}
      componentRenderer={(props) => <FieldPlaygroundDemo {...props} />}
    />
  );
};
