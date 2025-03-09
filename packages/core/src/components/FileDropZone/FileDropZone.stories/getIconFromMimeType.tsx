import { faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const getIconFromMimeType = (mimeType?: string): React.ReactNode => {
  switch (mimeType) {
    case 'application/pdf':
      return <FontAwesomeIcon icon={faFilePdf} />;

    default:
      return <FontAwesomeIcon icon={faFile} />;
  }
};
