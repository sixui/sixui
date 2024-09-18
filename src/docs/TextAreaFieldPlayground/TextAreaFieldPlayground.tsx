import type { IPlaygroundSections } from '~/docs/Playground';
import type { ITextAreaFieldPlaygroundDemoProps } from './TextAreaFieldPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { textFieldBasePlaygroundSections } from '~/docs/TextFieldBasePlayground';
import { TextAreaFieldPlaygroundDemo } from './TextAreaFieldPlaygroundDemo';

export const textAreaFieldPlaygroundSections: IPlaygroundSections<ITextAreaFieldPlaygroundDemoProps> =
  {
    textAreaField: {
      title: 'Text Area Field',
      options: [
        {
          label: 'Placeholder',
          input: {
            type: 'string',
            value: 'Placeholder',
            targetProp: 'placeholder',
          },
        },
        {
          label: 'Resizable',
          props: {
            resizable: true,
          },
        },
      ],
    },
    ...textFieldBasePlaygroundSections,
  };

export const TextAreaFieldPlayground: React.FC = (props) => {
  return (
    <Playground<ITextAreaFieldPlaygroundDemoProps>
      {...props}
      defaultSections={textAreaFieldPlaygroundSections}
      componentRenderer={(props) => <TextAreaFieldPlaygroundDemo {...props} />}
    />
  );
};
