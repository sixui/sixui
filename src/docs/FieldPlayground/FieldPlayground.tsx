import type { IPlaygroundSections } from '~/docs/Playground';
import type { IFieldPlaygroundDemoProps } from './FieldPlaygroundDemo';
import { fieldBasePlaygroundSections } from '~/docs/FieldBasePlayground';
import { Playground } from '~/docs/Playground';
import { FieldPlaygroundDemo } from './FieldPlaygroundDemo';

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
