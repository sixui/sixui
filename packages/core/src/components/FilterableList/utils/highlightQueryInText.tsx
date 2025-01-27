import highlightWords from 'highlight-words';

export const highlightQueryInText = (
  text?: string,
  query?: string,
): React.ReactNode =>
  query && text
    ? highlightWords({
        text,
        query,
      }).map((chunk, index) =>
        chunk.match ? (
          <strong key={index}>{chunk.text}</strong>
        ) : (
          <span key={index}>{chunk.text}</span>
        ),
      )
    : text;
