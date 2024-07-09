import { forwardRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import stylex from '@stylexjs/stylex';

import type { ICopyableTextProps } from './CopyableTextProps';
import { ReactComponent as CopyToClipboardIcon } from '@/assets/CopyToCliboard.svg';
import { copyToClipboard } from '@/helpers/copyToClipboard';
import { PlainTooltip } from '@/components/atoms/PlainTooltip';
import { FluidButton } from '@/components/atoms/FluidButton';

const styles = stylex.create({
  container: {
    display: 'inline-flex',
    gap: '0.375em',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
  },
});

export const CopyableText = forwardRef<HTMLElement, ICopyableTextProps>(
  function CopyableText(props, forwardedRef) {
    const {
      sx,
      icon,
      children,
      text,
      disabled,
      copySupportingText = 'Copy',
      copiedSupportingText = 'Copied!',
      ...other
    } = props;
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
          sx={sx}
          onClick={handleCopy}
          disabled={disabled}
          {...other}
          ref={containerHandleRef}
        >
          <div {...stylex.props(styles.container)}>
            {children ? (
              <div {...stylex.props(styles.text)}>{children}</div>
            ) : null}
            {isTriggerVisible
              ? icon ?? <CopyToClipboardIcon aria-hidden />
              : null}
          </div>
        </FluidButton>
      </PlainTooltip>
    );
  },
);
