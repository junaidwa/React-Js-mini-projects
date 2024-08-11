import { useState, useEffect } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
  }
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9
  }
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "7a0948e9";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();

  //First of all we fetch data in wrong way in react application:
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.Search); //It's work but in network sectin there are infinte number of requests send this. Because as we learni in previous section that is we don't update any state in render section .When we break rule of react js then we see this error.To overcome this proble  we use useeffect hook .If we use console.log to get data in console then it's work fine.In this case our component state change or update on every render but we use useeffect hook to control rendering.In this code our componenet render in four way. First when intial render menas intial app and second when state and props chagne third when parent component render and fourth with virtual Dom etc.
  //   });

  //We use useeffect hook and allow to render only when component mount means for initial render by passing empty dependency array.

  // useEffect(function(){
  //     fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.Search);
  //   })

  // },[]) //Now it's work fine and there are no infinite number of requests.

  //Theroy Lectures:
  //First of all I explain side effects. Side effect is basically interaction between react component and outside the word of component.For example when we work with API then we want to create side effects to fetch data from API.
  //There are two ways to create side effects .One is eventhandler and second effects(useeffecthooks).
  //Event handler create side effect when certain events handle but on the other hand effects create side event when components mount or intial render.
  //Event handler is also a preferred way of creating side effects but to solve or overcome sove problem use effects to create side effects with the help of dependency array.When dependency array is empty then means we want ot create side effects only when component mounts.

  //As we know that we fetch data with asyn function and promises so We use asyn function to fect movies data.
  const query = `interstellar`;

  useEffect(() => {
    async function fetchMovies() {
      try {
        setisLoading(true); // Start loading
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();

        if (!data.Search) {
          throw new Error("No movies found");
        }

        if (data.response === "false") throw new Error("Movies Not Fount");

        setMovies(data.Search);
        seterror(null); // Clear any previous errors
      } catch (err) {
        console.log(err.message);
        seterror(err.message);
      } finally {
        setisLoading(false); // End loading
      }
    }

    fetchMovies();
  }, []);
  //     //Now we get two array object becasue this is due to strict mode of react js.If we remove strit mode from index.js then we have return only one objects. And returning of two object only in development stage.When we deploy our application then by default we get only one objects.

  //Now it's work fine .

  //Now we create a loader to that is shown on the space of movies when our movies loaded from api.

  //Now we handle with error if we put any wrong query in input search filed.


  //Now we learn about dependency array:
  //It's tell use effect hook that what to run.
  //Without this useeffect don't know about what to learn.
  // There is neccessary for react application that all state and props of useeffect hook pass in dependency array.
  //If dependency array are empty means useeffect hook run only on mount.
  //If have some state and props then run on mount and also when given state and props updtate then it's re-render.
  // If we don't put dependecy array in useeffect hook then means component re-render on every rendering.
  // Basically above concept are not life cycle of useeffect. It's a syncronization.
  //Syncronization means conccect between UI Design and data source.

  //Now we learn about when are effect executed and also learn about time line  of component executions.
  //First of all render (mount) or initial render.
  //Then commit 
  //Then browser paint
  //Then Effects
  //If state change 
  //Then re-render
  //Commit 
   //Befroe browser paint there is a one state of layout effects
   //Then browser paint
   //Effect

   //At then end 
   //Effect are  unmounts.

  return (
    <>
      <Navbar>
        {" "}
        <NavLogo />
        <Search />
        <NumResults movies={movies} />{" "}
      </Navbar>
      <Main movies={movies}>
        <MoviesBox>
          {/* {isLoading ? <Footer /> : <MovieList movie={movies} />}{" "} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movie={movies} />}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        <MoviesBox>
          <SummaryWathed watched={watched} />

          <WatchedMoviesList watched={watched} />
        </MoviesBox>
      </Main>
    </>
  );
}
function Loader() {
  return <div className="loader">Loading...</div>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>😡 {message}</span>
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// function WatchedList() {
//   // const [movies, setMovies] = useState(tempMovieData);

//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen1, setIsOpen1] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <SummaryWathed watched={watched} />

//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function MoviesBox({ children }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);
  // const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movie }) {
  // const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movie?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NavLogo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SummaryWathed({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMoviesLists movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMoviesLists({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
