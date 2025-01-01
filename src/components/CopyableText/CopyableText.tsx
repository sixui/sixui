import { useState } from 'react';
import { renderToString } from 'react-dom/server';

import type { ICopyableTextThemeFactory } from './CopyableText.css';
import type { ICopyableTextFactory } from './CopyableText.types';
import { iconCopyToCliboard } from '~/assets/icons';
import { copyToClipboard } from '~/helpers/copyToClipboard';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
import { PlainTooltip } from '../PlainTooltip';
import { SvgIcon } from '../SvgIcon';
import { copyableTextTheme } from './CopyableText.css';

const COMPONENT_NAME = 'CopyableText';

export const CopyableText = componentFactory<ICopyableTextFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      text,
      copySupportingText = 'Copy',
      copiedSupportingText = 'Copied!',
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICopyableTextThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: copyableTextTheme,
      modifiers: {
        disabled,
      },
    });

    const [copied, setCopied] = useState(false);

    const handleCopy = async (): Promise<void> => {
      const textToCopy = text ?? renderToString(children);
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
        <Button
          {...getStyles('root')}
          variant="inline"
          classNames={mergeClassNames(classNames, {
            label: getStyles('label').className,
          })}
          trailingIcon={<SvgIcon icon={iconCopyToCliboard} />}
          onClick={handleCopy}
          ref={forwardedRef}
          {...other}
        >
          {children}
        </Button>
      </PlainTooltip>
    );
  },
);

CopyableText.theme = copyableTextTheme;
CopyableText.displayName = `@sixui/${COMPONENT_NAME}`;
