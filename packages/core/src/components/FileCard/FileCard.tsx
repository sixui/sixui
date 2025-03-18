import { useState } from 'react';

import type { IFileCardThemeFactory } from './FileCard.css';
import type { IFileCardFactory } from './FileCard.types';
import { iconXMark } from '~/assets/icons';
import { Card } from '~/components/Card';
import { CircularProgressIndicator } from '~/components/CircularProgressIndicator';
import { IconButton } from '~/components/IconButton';
import { MoveHandleIndicator } from '~/components/MoveHandle';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { getFormattedFileSize } from '~/utils/getFormattedFileSize';
import { isFunction } from '~/utils/isFunction';
import { Skeleton } from '../Skeleton';
import { COMPONENT_NAME } from './FileCard.constants';
import { fileCardTheme } from './FileCard.css';

export const FileCard = componentFactory<IFileCardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      disabled: disabledProp,
      media,
      icon,
      fileName,
      fileSize,
      thumbUrl,
      onDelete,
      deleteIcon,
      extraActions,
      moveHandle,
      loading,
      progress,
      supportingText,
      hasError,
      errorText,
      children,
      initializing,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [handling, setHandling] = useState(false);

    const disabled = disabledProp || handling;
    const canDelete = !!onDelete;
    const loaded = !loading && !hasError;
    const hasActions =
      !disabled && (canDelete || !!extraActions || !!moveHandle);

    const { getStyles } = useComponentTheme<IFileCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileCardTheme,
      modifiers: {
        disabled,
        'with-error': hasError,
        'with-thumb': !!thumbUrl,
        loading: !loaded,
      },
    });

    const handleDelete = async (): Promise<void> => {
      setHandling(true);
      await onDelete?.();
      setHandling(false);
    };

    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;

    return (
      <Card
        {...getStyles('root')}
        ref={forwardedRef}
        variant="outlined"
        disabled={disabled}
        {...other}
      >
        <Skeleton {...getStyles('skeleton')} loaded={!initializing}>
          <Card.Media
            {...getStyles('media')}
            classNames={{
              content: getStyles('mediaContent').className,
            }}
            src={thumbUrl}
          >
            {loading ? (
              <CircularProgressIndicator
                {...getStyles('progressIndicator')}
                value={progress}
                withLabel
                hideInactiveTrack
              />
            ) : thumbUrl ? undefined : icon ? (
              <div {...getStyles('icon')}>{icon}</div>
            ) : (
              media
            )}
          </Card.Media>
        </Skeleton>

        <Card.Content {...getStyles('content')}>
          <div {...getStyles('fileInfo')}>
            {fileName && <div {...getStyles('fileName')}>{fileName}</div>}
            {fileSize && (
              <div {...getStyles('fileSize')}>
                {getFormattedFileSize(fileSize)}
              </div>
            )}
          </div>

          {children}

          {supportingOrErrorText && (
            <div {...getStyles('supportingText')}>{supportingOrErrorText}</div>
          )}
        </Card.Content>

        {hasActions && (
          <Card.Actions>
            {isFunction(extraActions)
              ? extraActions({ disabled })
              : extraActions}

            {canDelete && (
              <IconButton
                icon={deleteIcon ?? <SvgIcon icon={iconXMark} />}
                onClick={handleDelete}
                disabled={disabled}
              />
            )}

            {moveHandle && (
              <MoveHandleIndicator
                {...getStyles('moveHandle')}
                orientation="vertical"
                disabled={disabled}
              />
            )}
          </Card.Actions>
        )}
      </Card>
    );
  },
);

FileCard.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileCard.theme = fileCardTheme;
