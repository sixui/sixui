import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IFormStyleKey } from './Form.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';

export interface IFormProps
  extends Omit<IContainer<IFormStyleKey>, 'theme'>,
    Pick<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
}

export const Form: React.FC<IFormProps> = ({
  onSubmit,
  children,
  ...props
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IFormStyleKey>(stylesCombinatorFactory(props.styles)),
    [props.styles],
  );

  // TODO: make this callback to be called only once on form validation.
  const handleInvalid: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(() => {
      const formEl = formRef.current;
      if (!formEl) {
        return;
      }

      // Focus the first invalid field.
      const invalidFields = formEl.querySelectorAll(':invalid');
      const firstInvalidField = invalidFields[0] as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;

      // Check if element has focus
      if (!firstInvalidField?.matches(':focus')) {
        firstInvalidField?.focus();
      }
    }, []);

  return (
    <form
      {...styleProps(['host', props.sx])}
      ref={formRef}
      onSubmit={onSubmit}
      onInvalid={handleInvalid}
    >
      {children}
    </form>
  );
};
