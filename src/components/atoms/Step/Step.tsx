import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type { IStepStyleKey, IStepStyleVarKey } from './Step.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { Divider } from '../Divider';
import { ButtonBase, type IButtonBaseOwnProps } from '../ButtonBase';

export type IStepProps = IContainerProps<IStepStyleKey> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'];
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  labelPosition?: 'right' | 'bottom';
  hasError?: boolean;
};

export const Step = forwardRef<HTMLDivElement, IStepProps>(
  function Step(props, ref) {
    const {
      styles,
      sx,
      innerStyles,
      active,
      completed,
      disabled,
      index,
      last,
      icon,
      label,
      supportingText,
      labelPosition = 'right',
      hasError,
      ...other
    } = props;

    const { theme } = useComponentTheme('Step');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStepStyleKey, IStepStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    const hasText = label || supportingText;

    return (
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        <Divider sx={stylesCombinator('separator')} />
        <ButtonBase
          sx={stylesCombinator('button')}
          innerStyles={{
            ...innerStyles,
            focusRing: [
              theme.focusRingStyles,
              ...asArray(innerStyles?.focusRing),
            ],
          }}
          disabled={disabled}
        >
          <div
            {...sxf(
              'buttonInner',
              hasText && 'buttonInner$withText',
              labelPosition === 'bottom'
                ? `buttonInner$labelBottom`
                : `buttonInner$labelRight`,
            )}
          >
            <div
              {...sxf(
                'stepIndex',
                icon ? 'stepIndex$icon' : 'stepIndex$text',
                disabled
                  ? icon
                    ? 'stepIndex$icon$disabled'
                    : 'stepIndex$text$disabled'
                  : hasError &&
                      (icon ? 'stepIndex$icon$error' : 'stepIndex$text$error'),
              )}
            >
              {icon ?? (completed ? <CheckMarkIcon aria-hidden /> : index)}
            </div>
            {hasText ? (
              <div
                {...sxf(
                  'labelContainer',
                  disabled
                    ? 'labelContainer$disabled'
                    : hasError && 'labelContainer$error',
                  `labelContainer$${labelPosition}`,
                )}
              >
                <div {...sxf('label')}>{label}</div>
                <div {...sxf('supportingText')}>{supportingText}</div>
              </div>
            ) : null}
          </div>
        </ButtonBase>
      </div>
    );
  },
);
