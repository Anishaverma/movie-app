import React, { useEffect, useState } from 'react';
import { IMG_LINK } from "../../secret"
import "./movie.css"
import { Link } from "react-router-dom"
import axios from "axios";
import { API_URL, API_KEY, IMAGE_URL } from "../../secret";


// class Movie extends React.Component {
 




// render() {



//   return 
// }
// }

// export default Movie;


// import React from 'react'

const Movie = (props) => {

  const [detailedMovieObj , setDetailedMovieObj] = useState({})
 
  
useEffect(async () => {
    const response = await axios.get(
      `${API_URL}/movie/${props.movieObj?.id}?api_key=${API_KEY}`
    )
    let detailedMovieObj = response.data;
    let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
    // this.setState({
    //   detailedMovieObj: { ...detailedMovieObj, poster_path: posterPath },
    // });
    setDetailedMovieObj({ ...detailedMovieObj, poster_path: posterPath })  
}, [])

  const Obj = props.movieObj;
  const  imgLink = IMG_LINK + Obj.poster_path
  
  return (
    <div className="movie-item">
    <div className="movie-poster">
      <Link to={{ pathname: "/moviepage", state:  detailedMovieObj }}>
        <img src={imgLink} alt="" />
      </Link>
    </div>
    <div className="movie-info">
      <div className="movie-title">{Obj.title}</div>
      <div className="movie-rating">{Obj.vote_average} IMDB</div>
    </div>
  </div>
  )
}

export default Movie