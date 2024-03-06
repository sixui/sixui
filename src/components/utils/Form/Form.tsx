import { forwardRef, useCallback, useMemo, useRef } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IFormStyleKey } from './Form.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useForkRef } from '@/hooks/useForkRef';

export type IFormProps = IContainerProps<IFormStyleKey> & {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const Form = forwardRef<HTMLFormElement, IFormProps>(
  function Form(props, ref) {
    const { styles, sx, children, ...other } = props;

    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IFormStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const formRef = useRef<HTMLFormElement>(null);
    const handleRef = useForkRef(ref, formRef);

    // TODO: make this callback to be called only once on form validation.
    const handleInvalid: React.FormEventHandler<HTMLFormElement> =
      useCallback(() => {
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
        {...sxf('host', sx)}
        ref={handleRef}
        onInvalid={handleInvalid}
        {...other}
      >
        {children}
      </form>
    );
  },
);
