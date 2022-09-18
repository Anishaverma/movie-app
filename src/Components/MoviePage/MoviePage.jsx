import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./MoviePage.css";

import { API_URL, API_KEY } from "../../secret";

// class MoviePage extends Component {
//   state = {
//     videoObject: {},
//   };



//   render() {



//   }
// }

const MoviePage = (props) => {
  const [videoObject, setVideoObject] = useState({});
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  let { title, tagline, vote_average, poster_path, overview } = props.location.state;
  useEffect(async () => {
    let response = await axios.get(
      `${API_URL}/movie/${props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`
    ); 
    console.log(response);
    let videoObject = response.data.results.filter((videoObj) => {
      if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
        return true;
      }
      return false;
    });
    // [{}]
    setVideoObject(videoObject[0],)
    //  this.setState({
    //   videoObject: videoObject[0],
    // });


  }, [])


  return (
    <div className="movie-page">
      <div className="movie-page-poster">
        <img src={poster_path} alt="" />
      </div>
      <div className="movie-page-details">
        <div className="movie-title-info">
          <h1>
            {title} IMDB - {vote_average}
          </h1>
          <span>{tagline}</span>
          <p>{overview}</p>
        </div>
        <div className="movie-trailer">
          <YouTube videoId={videoObject.key} opts={opts}></YouTube>
        </div>
      </div>
    </div>
  );
}

export default MoviePage