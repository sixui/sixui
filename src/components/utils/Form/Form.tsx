import React from 'react';
import * as stylex from '@stylexjs/stylex';

import type { IContainer } from '@/helpers/Container';
import type { IFormStyleKey } from './Form.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';

export interface IFormProps
  extends IContainer<IFormStyleKey>,
    Pick<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
}

export const Form: React.FC<IFormProps> = ({ onSubmit, children, styles }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const stylesCombinator = React.useMemo(
    () => stylesCombinatorFactory(styles),
    [styles],
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
      {...stylex.props(stylesCombinator('host'))}
      ref={formRef}
      onSubmit={onSubmit}
      onInvalid={handleInvalid}
    >
      {children}
    </form>
  );
};
