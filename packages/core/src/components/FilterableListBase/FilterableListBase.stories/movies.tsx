// Inspiration:
// - https://github.com/palantir/blueprint/blob/develop/packages/select/src/__examples__/films.tsx

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import highlightWords from 'highlight-words';

import type { IListItemProps } from '~/components/List/ListItem';
import type {
  IFilterableCreateNewListItemRenderer,
  IFilterableListItemPredicate,
  IFilterableListItemRenderer,
  IFilterableListItemRendererProps,
} from '../FilterableListBase.types';
import { ListItem } from '~/components/List/ListItem';
import { Text } from '~/components/Text';

export type IMovie = {
  /**
   * Title of movie
   */
  title: string;

  /**
   * Release year
   */
  year: number;

  /**
   * IMDb ranking
   */
  rank?: number;
};

/** Top 100 movies as rated by IMDb users. http://www.imdb.com/chart/top */
export const TOP_100_MOVIES: Array<IMovie> = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'The Godfather Part II', year: 1974 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Fight Club', year: 1999 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Goodfellas', year: 1990 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Se7en', year: 1995 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'City of God', year: 2002 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  // { title: 'Léon: The Professional', year: 1994 },
  // { title: 'Saving Private Ryan', year: 1998 },
  // { title: 'Spirited Away', year: 2001 },
  // { title: 'Interstellar', year: 2014 },
  // { title: 'The Green Mile', year: 1999 },
  // { title: 'American History X', year: 1998 },
  // { title: 'Parasite', year: 2019 },
  // { title: 'Harakiri', year: 1962 },
  // { title: 'Whiplash', year: 2014 },
  // { title: 'The Intouchables', year: 2011 },
  // { title: 'The Departed', year: 2006 },
  // { title: 'The Prestige', year: 2006 },
  // { title: 'The Pianist', year: 2002 },
  // { title: 'Gladiator', year: 2000 },
  // { title: 'Terminator 2: Judgment Day', year: 1991 },
  // { title: 'Back to the Future', year: 1985 },
  // { title: 'The Lion King', year: 1994 },
  // { title: 'The Lives of Others', year: 2006 },
  // { title: 'Apocalypse Now', year: 1979 },
  // { title: 'Alien', year: 1979 },
  // { title: 'Sunset Blvd.', year: 1950 },
  // {
  //   title:
  //     'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  //   year: 1964,
  // },
  // { title: 'Memento', year: 2000 },
  // { title: 'The Great Dictator', year: 1940 },
  // { title: 'Cinema Paradiso', year: 1988 },
  // { title: 'The Shining', year: 1980 },
  // { title: 'Paths of Glory', year: 1957 },
  // { title: 'Django Unchained', year: 2012 },
  // { title: 'WALL·E', year: 2008 },
  // { title: 'American Beauty', year: 1999 },
  // { title: 'The Dark Knight Rises', year: 2012 },
  // { title: 'Oldboy', year: 2003 },
  // { title: 'Aliens', year: 1986 },
  // { title: 'Witness for the Prosecution', year: 1957 },
  // { title: 'Once Upon a Time in America', year: 1984 },
  // { title: 'Das Boot', year: 1981 },
  // { title: 'Citizen Kane', year: 1941 },
  // { title: 'Vertigo', year: 1958 },
  // { title: 'North by Northwest', year: 1959 },
  // { title: 'Reservoir Dogs', year: 1992 },
  // { title: 'Braveheart', year: 1995 },
  // { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  // { title: 'Requiem for a Dream', year: 2000 },
  // { title: 'Amélie', year: 2001 },
  // { title: 'A Clockwork Orange', year: 1971 },
  // { title: 'Like Stars on Earth', year: 2007 },
  // { title: 'Taxi Driver', year: 1976 },
  // { title: 'Lawrence of Arabia', year: 1962 },
  // { title: 'Double Indemnity', year: 1944 },
  // { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  // { title: 'Amadeus', year: 1984 },
  // { title: 'To Kill a Mockingbird', year: 1962 },
  // { title: 'Toy Story 3', year: 2010 },
  // { title: 'Logan', year: 2017 },
  // { title: 'Full Metal Jacket', year: 1987 },
  // { title: 'Dangal', year: 2016 },
  // { title: 'The Sting', year: 1973 },
  // { title: '2001: A Space Odyssey', year: 1968 },
  // { title: "Singin' in the Rain", year: 1952 },
  // { title: 'Bicycle Thieves', year: 1948 },
  // { title: 'Inglourious Basterds', year: 2009 },
  // { title: 'The Kid', year: 1921 },
  // { title: 'Snatch', year: 2000 },
  // { title: '3 Idiots', year: 2009 },
  // { title: 'Monty Python and the Holy Grail', year: 1975 },
  // { title: 'L.A. Confidential', year: 1997 },
  // { title: 'Scarface', year: 1983 },
  // { title: 'Rashomon', year: 1950 },
  // { title: 'Indiana Jones and the Last Crusade', year: 1989 },
  // { title: 'The Apartment', year: 1960 },
  // { title: 'Metropolis', year: 1927 },
  // { title: 'All About Eve', year: 1950 },
  // { title: 'Yojimbo', year: 1961 },
  // { title: 'Batman Begins', year: 2005 },
  // { title: 'Unforgiven', year: 1992 },
].map((f, index) => ({ ...f, rank: index + 1 }));

/**
 * Takes the same arguments as `IFilterableItemRenderer<IMovie>`, but returns
 * the common menu item props for that item instead of the rendered element
 * itself. This is useful for implementing custom item renderers.
 */
export const getMovieItemProps = <TElement extends HTMLElement>(
  movie: IMovie,
  { modifiers, query }: IFilterableListItemRendererProps<TElement>,
): IListItemProps & React.Attributes => {
  const text = movie.title;

  return {
    disabled: modifiers.disabled,
    leading: (
      <Text variant="body" size="sm">
        {movie.rank ? `${movie.rank.toString()}.` : undefined}
      </Text>
    ),
    trailingSupportingText: movie.year.toString(),
    children: query
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
      : text,
  };
};

/**
 * Simple movie item renderer for "list" containers.
 */
export const renderMovieListItem: IFilterableListItemRenderer<
  IMovie,
  HTMLButtonElement
> = (movie, props) => {
  if (!props.modifiers.matchesPredicate) {
    return null;
  }

  const buttonAttributes = props.getButtonAttributes();

  return (
    <ListItem
      {...getMovieItemProps(movie, props)}
      key={props.index}
      as="button"
      interactions={{ hovered: !!props.modifiers.active }}
      interactionsMergeStrategy="override"
      selected={props.modifiers.selected}
      disabled={props.modifiers.disabled}
      {...buttonAttributes}
      ref={props.buttonRef}
    />
  );
};

/**
 * Renders a list item to create a single movie from a given query string.
 */
export const renderCreateMovieListItem: IFilterableCreateNewListItemRenderer<
  HTMLButtonElement
> = (props): React.JSX.Element => (
  <ListItem
    key={props.index}
    as="button"
    interactions={{ hovered: props.modifiers.active }}
    leadingIcon={<FontAwesomeIcon icon={faPlus} />}
    {...props.getButtonAttributes()}
    ref={props.buttonRef}
  >
    {`Create "${props.query}"`}
  </ListItem>
);

/**
 * Filters movie list with a case-insensitive search.
 */
export const filterMovie: IFilterableListItemPredicate<IMovie> = (
  movie,
  query,
  _index,
  exactMatch,
) => {
  const normalizedTitle = movie.title.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  return exactMatch
    ? normalizedTitle === normalizedQuery
    : `${movie.rank}. ${normalizedTitle} ${movie.year}`.includes(
        normalizedQuery,
      );
};

/**
 * Creates a movie from a query string.
 */
export const createMovie = (query: string): IMovie => {
  return {
    title: query,
    year: new Date().getFullYear(),
  };
};

/**
 * Compares two movies for equality.
 */
export const areMoviesEqual = (movieA: IMovie, movieB: IMovie): boolean => {
  // Compare only the titles (ignoring case) just for simplicity.
  return movieA.title.toLowerCase() === movieB.title.toLowerCase();
};

/**
 * Returns `true` if the movie release year is before 1987.
 */
export const isMovieDisabled = (movie: IMovie): boolean => movie.year < 1987;

export const getMovieLabel = (movie: IMovie): string => movie.title;
