import { useEffect } from "react";
 export default function useFetchData(setisLoading,seterror,setMovies,HandleClosebtn,query,KEY){
    // const KEY = "7a0948e9";

    useEffect(() => {
        async function fetchMovies() { //async keywords to make the function asyncronys.
          try {
            setisLoading(true); // Start loading
            seterror("");
    
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            );
            if (!res.ok) throw new Error("Fetch failed");
    
            const data = await res.json();  //await keywords wait for other functions.
    
            if (!data.Search) {
              throw new Error("No movies found");
            }
    
            if (data.response === "false") throw new Error("Movies Not Fount");
    
            setMovies(data.Search);
            // console.log(data.Search);
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
        HandleClosebtn();  //When one Movie selected and then search other movi then movie seleted close automaticlay not movie history or add move but only open movie close with this.
    
        fetchMovies();
      }, [query]);
}

