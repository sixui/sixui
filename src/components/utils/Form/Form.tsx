import { useCallback, useMemo, useRef } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IFormStyleKey } from './Form.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';

export type IFormProps = Omit<IContainerProps<IFormStyleKey>, 'theme'> &
  Pick<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
    children: React.ReactNode;
  };

export const Form: React.FC<IFormProps> = ({
  onSubmit,
  children,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IFormStyleKey>(
        stylesCombinatorFactory(props.styles),
        props.visualState,
      ),
    [props.styles, props.visualState],
  );

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
      {...styleProps(['host', props.sx])}
      ref={formRef}
      onSubmit={onSubmit}
      onInvalid={handleInvalid}
    >
      {children}
    </form>
  );
};
