// This is a hack to prevent the first focusable element from being focused
// when the side sheet is opened.
export const PreventAutoFocus: React.FC = () => (
  <button
    type="button"
    style={{
      position: 'absolute',
      left: '-9999px',
    }}
  />
);
