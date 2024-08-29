import { forwardRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ICopyableTextProps } from './CopyableText.types';
import { copyToClipboard } from '~/helpers/copyToClipboard';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { iconCopyToCliboard } from '~/assets/icons';
import { PlainTooltip } from '../PlainTooltip';
import { FluidButton } from '../FluidButton';
import { SvgIcon } from '../SvgIcon';
import { copyableTextStyles } from './CopyableText.styles';
import { useStyles } from '~/hooks/useStyles';

export const CopyableText = createPolymorphicComponent<
  'button',
  ICopyableTextProps
>(
  forwardRef<HTMLButtonElement, ICopyableTextProps>(
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

      const { getStyles, globalStyles } = useStyles({
        componentName: 'CopyableText',
        styles: [copyableTextStyles, styles],
      });

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

      const handleOpen = (): void => setCopied(false);

      return (
        <PlainTooltip
          supportingText={copied ? copiedSupportingText : copySupportingText}
          onOpen={handleOpen}
          disabled={disabled}
        >
          <FluidButton
            onClick={handleCopy}
            disabled={disabled}
            styles={innerStyles?.fluidButton}
            {...other}
            sx={[globalStyles, sx]}
            ref={containerHandleRef}
          >
            <div {...getStyles('inner')}>
              {children ? <div {...getStyles('text')}>{children}</div> : null}
              {isTriggerVisible
                ? (icon ?? <SvgIcon icon={iconCopyToCliboard} />)
                : null}
            </div>
          </FluidButton>
        </PlainTooltip>
      );
    },
  ),
);
