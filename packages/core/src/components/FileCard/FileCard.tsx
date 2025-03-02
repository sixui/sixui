import type { IFileCardThemeFactory } from './FileCard.css';
import type { IFileCardFactory } from './FileCard.types';
import { iconXMark } from '~/assets/icons';
import { Card } from '~/components/Card';
import { CircularProgressIndicator } from '~/components/CircularProgressIndicator';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { getFormattedFileSize } from '~/utils/getFormattedFileSize';
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
      disabled,
      media,
      icon,
      fileName,
      fileSize,
      thumbUrl,
      onDelete,
      deleteIcon,
      extraActions,
      loading,
      progress,
      supportingText,
      hasError: hasErrorProp,
      errorText,
      hideMetadata,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hasError = hasErrorProp || !!errorText;
    const canDelete = !!onDelete;
    const loaded = !loading && !hasError;
    const hasSupportingText = !!errorText || !!supportingText;
    const hasActions = !disabled && (canDelete || !!extraActions);

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
        'with-metadata': !hideMetadata,
        'with-thumb': !!thumbUrl,
        loading: !loaded,
      },
    });

    return (
      <Card
        {...getStyles('root')}
        ref={forwardedRef}
        variant="outlined"
        disabled={disabled}
        {...other}
      >
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

        {!hideMetadata && (
          <Card.Content>
            <div {...getStyles('fileInfo')}>
              {fileName && <div {...getStyles('fileName')}>{fileName}</div>}
              {fileSize && (
                <div {...getStyles('fileSize')}>
                  {getFormattedFileSize(fileSize)}
                </div>
              )}
            </div>

            {children}

            {hasSupportingText && (
              <div {...getStyles('supportingTextContainer')}>
                <div {...getStyles('supportingText')}>
                  {errorText ?? supportingText}
                </div>
              </div>
            )}
          </Card.Content>
        )}

        {hasActions ? (
          <div {...getStyles('actions')}>
            {canDelete && (
              <IconButton
                icon={deleteIcon ?? <SvgIcon icon={iconXMark} />}
                onClick={onDelete}
                variant="danger"
              />
            )}

            {extraActions}
          </div>
        ) : null}
      </Card>
    );
  },
);

FileCard.theme = fileCardTheme;
FileCard.displayName = `@sixui/core/${COMPONENT_NAME}`;
