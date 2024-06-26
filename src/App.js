import React, { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";


const API_URL= 'http://www.omdbapi.com/?i=tt3896198&apikey=4164a9e7'
const App = ()=>{

    const [movies, setMovie] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovie(data.Search);
    }

    useEffect(()=>{
        searchMovies('Spiderman')
    }, []);

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0? (
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}></MovieCard>)
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App;