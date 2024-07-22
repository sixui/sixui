import { forwardRef, useMemo, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ICopyableTextProps } from './CopyableText.types';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { copyToClipboard } from '@/helpers/copyToClipboard';
import { PlainTooltip } from '@/components/PlainTooltip';
import { FluidButton } from '@/components/FluidButton';
import { SvgIcon } from '@/components/SvgIcon';
import { iconCopyToCliboard } from '@/assets/icons';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { copyableTextStyles } from './CopyableText.styles';

export const CopyableText = forwardRef<HTMLElement, ICopyableTextProps>(
  function CopyableText(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      icon,
      children,
      text,
      disabled,
      copySupportingText = 'Copy',
      copiedSupportingText = 'Copied!',
      ...other
    } = props;

    const componentTheme = useComponentTheme('CopyableText');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(copyableTextStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const containerHandleRef = useMergeRefs([forwardedRef]);
    const [copied, setCopied] = useState(false);
    const isTriggerVisible = !disabled;

    const handleCopy = async (): Promise<void> => {
      const textToCopy = text ?? children?.toString();
      if (!textToCopy) {
        return;
      }

      await copyToClipboard(textToCopy);

      setCopied(true);
    };

    const handleTooltipOpenChange = (open: boolean): void => {
      if (open) {
        setCopied(false);
      }
    };

    return (
      <PlainTooltip
        supportingText={copied ? copiedSupportingText : copySupportingText}
        onOpenChange={handleTooltipOpenChange}
        disabled={disabled}
      >
        <FluidButton
          onClick={handleCopy}
          disabled={disabled}
          styles={innerStyles?.fluidButton}
          {...other}
          ref={containerHandleRef}
        >
          <div {...sxf(componentTheme.overridenStyles, 'host', sx)}>
            {children ? <div {...sxf('text')}>{children}</div> : null}
            {isTriggerVisible
              ? (icon ?? <SvgIcon icon={iconCopyToCliboard} />)
              : null}
          </div>
        </FluidButton>
      </PlainTooltip>
    );
  },
);
