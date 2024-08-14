import { useState, useEffect } from "react";
import StarRating from "./StarRating";
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
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();
  const [selectedID, setselectedID] = useState(null);

  function HandleClosebtn() {
    setselectedID(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function HandleDelete(id){
    // watched.filter((mov)=>mov.imdbID !==id);
    setWatched((watched) =>watched.filter((mov)=>mov.imdbID !==id) );
  }

  //First of all we fetch data in wrong way in react application:
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.Search); //It's work but in network sectin there are infinte number of requests send this. Because as we learn in previous section that is we don't update any state in render section .When we break rule of react js then we see this error.To overcome this problem  we use useeffect hook .If we use console.log to get data in console then it's work fine.In this case our component state change or update on every render but we use useeffect hook to control rendering.In this code our componenet render in four way. First when intial render menas intial app and second when state and props chagne third when parent component render and fourth with virtual Dom etc.
  //   });

  //We use useeffect hook and allow to render only when component mount means for initial render by passing empty dependency array.

  // useEffect(function(){
  //     fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.Search);
  //   })

  // },[]) //Now it's work fine and there are no infinite number of requests.
  //[] is the dependency array and empty means given effect render only on mount.

  //Theroy Lectures:
  //First of all I explain side effects. Side effect is basically interaction between react component and outside the word of component.For example when we work with API then we want to create side effects to fetch data from API.
  //There are two ways to create side effects .One is eventhandler and second effects(useeffecthooks).
  //Event handler create side effect when certain events handle but on the other hand effects create side effects when components mount or intial render.
  //Event handler is also a preferred way of creating side effects but to solve or overcome sove problem use effects to create side effects with the help of dependency array.When dependency array is empty then means we want ot create side effects only when component mounts.

  //As we know that we fetch data with asyn function and promises so We use asyn function to fect movies data.
  // const tempQuery = `interstellar`; //Now it's not use because not we use query state that store value of search input.

  //Now we implement previous lecture of dependency array in practice in above code:
  //First of all I implement some experiment before going to our application:
  // useEffect(function(){
  //   console.log("A")
  // }) //with no dependency array means render with every things

  // useEffect(function(){
  //   console.log("B")
  // },[])  //Empty array means render only on mount
  // console.log("C")
  //In console there are many number of print due to many render but important thing is that in first C print bcz we use asyncronys Coding and alone console print before with out any other waiting.
  //Then A print because It's console render on every mount
  //And then B render and it's console render only on only intial mount.

  // useEffect(function () {
  //   console.log("After Initial Render");
  // }, []);
  // useEffect(function () {
  //   console.log("On Every Render");
  // });
  // useEffect(
  //   function () {
  //     console.log("Only when state update");
  //   },
  //   [query]
  // );
  // console.log("Not depends on any rendering");
  //When we upddate state then in given order console log prints in browser:
  //  Not depends on any rendering
  //  After Initial Render
  //  On Every Render
  //  Only when state update

  useEffect(() => {
    async function fetchMovies() {
      try {
        setisLoading(true); // Start loading
        seterror("");

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
        console.log(data.Search);
        seterror(null); // Clear any previous errors
      } catch (err) {
        console.log(err.message);
        seterror(err.message);
      } finally {
        setisLoading(false); // End loading
      }
    }
    if (!query.length) {
      //If there is no search query then movies box are empty with no any message. In second option we put any default move in query State.
      setMovies([]);
      seterror("");
      return;
    }

    fetchMovies();
  }, [query]);
  //     //Now we get two array object becasue this is due to strict mode of react js.If we remove strit mode from index.js then we have return only one objects. And returning of two object only in development stage.When we deploy our application then by default we get only one objects.

  //Now it's work fine .

  //Now we create a loader to that is shown on the space of movies when our movies loaded from api.

  //Now we handle with error if we put any wrong query in input search filed.

  //Now we learn about dependency array:
  //It's tell use effect hook that when to run.
  //Without this useeffect don't know about when to run.
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
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />{" "}
      </Navbar>
      <Main movies={movies}>
        <MoviesBox>
          {/* {isLoading ? <Footer /> : <MovieList movie={movies} />}{" "} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movie={movies} selectID={setselectedID} />
          )}
          {error && <ErrorMessage message={error} />}
        </MoviesBox>
        <MoviesBox>
          {selectedID ? (
            <SelectedIDC
              selectedID={selectedID}
              onclose={HandleClosebtn}
              onAddMovie={handleAddWatched}
              watched={watched}
              
            />
          ) : (
            <>
              <SummaryWathed watched={watched} />
              <WatchedMoviesList watched={watched} onDelete={HandleDelete}/>
            </>
          )}
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

function MovieList({ movie, selectID }) {
  // const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list list-movies">
      {movie?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} selectID={selectID} />
      ))}
    </ul>
  );
}

function Movie({ movie, selectID }) {
  return (
    <li key={movie.imdbID} onClick={() => selectID(movie.imdbID)}>
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

function Search({ query, setQuery }) {
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

function WatchedMoviesList({ watched,onDelete }) {
  return (
    <ul className="list ">
      {watched.map((movie) => (
        <WatchedMoviesLists movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function WatchedMoviesLists({ movie ,onDelete}) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.exterrating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={()=>onDelete(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

function SelectedIDC({ selectedID, onclose, onAddMovie, watched }) {
  const [Movie, setMovie] = useState([]);
  const [exterrating, setexterrating] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre,
    genre
  } = Movie;
  console.log(title, year);
  //First we get Undefined,Undefined but in next line we also get tilte and year of Movies.
  //Why we get undefined,Undefined in first line because before rendering Movie is empty by default so,.

  const isAddList = watched.map((movie) => movie.imdbID).includes(selectedID);
  const AlreadyAddedRating = watched.find((mov)=>mov.imdbID===selectedID)?.exterrating;

  useEffect(
    function () {
      async function MovieData() {
        setisLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setisLoading(false);
      }
      MovieData();
    },
    [selectedID]
  );
  //If we don't put  selectedID in dependency array then only fist time it show movie details when we click on any movie but when we click on any movie in second time not show details .First movies details show . It is due [] render useeffect only on mount on when state changes it re-render.
  //Now we add loading functionality in watched movies box:

    useEffect(function(){
      if(!title) return
      document.title =`Movie ${title}`;


      return function(){
        document.title ="UsePopCons";
        console.log(`Movie remove with title ${title}`);
        //It show console but this run after the component unmount.Then how it remember title variable after component unmuont.
        //So the anser is that same like closure it remember all the variable that are exist at the time of this creation.
      }
      //Here above is the cleanup function that is retrun from useeffect hook.
      //It run when component unmount.
      //But same like closure it remember all variable that has been exist at the time of that creation.


    },[title]) //Here we change title of whole application with selected movie.


  function handleAddInList() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      exterrating
    };

    onAddMovie(newWatchedMovie);
    onclose(); //When we click on add then atuomatic
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onclose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${poster}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            {!isAddList ? (
              <div className="rating">
                <StarRating
                  maxrating={10}
                  size={17}
                  Onsetexternalratting={setexterrating}
                />
                {exterrating > 0 && (
                  <button className="btn-add" onClick={handleAddInList}>
                    Add new Movie+
                  </button>
                )}{" "}
              </div>
            ) : (
              <p>You already Added it and also rate it {AlreadyAddedRating} <span>⭐</span></p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starings {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {/* <div className="details">{selectedID}</div> */}
    </div>
  );
}
