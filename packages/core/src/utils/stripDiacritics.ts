// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// Give up on IE11 support for this feature
export const stripDiacritics = (string: string): string =>
  typeof string.normalize !== 'undefined'
    ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : string;
