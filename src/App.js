import React, { useState, useEffect } from 'react'
import Header from "./Components/Header/header";
import Movies from "./Components/Movies/moviess";
import Pagination from "./Components/Pagination/pagination";
import axios from "axios";
import { API_URL, API_KEY, ID_URL } from "./secret";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Favourite from "./Components/Favourite/Favourite";
import MoviePage from "./Components/MoviePage/MoviePage";


const App = () => {
  const [state, setState] = useState({
    moviesData: [],
    currentMovie: "Furious",
    currPage: null,
    pageCount: [],
  })

 const  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: state.currPage + 1,
        query: state.currentMovie,
      },
    });

    data = data.data.results;

    setState({
      moviesData: data,
      currPage: state.currPage + 1,
    });
  };

 const  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: state.currPage - 1,
        query: state.currentMovie,
      },
    });
    data = data.data.results;
    setState({
      moviesData: data,
      currPage: state.currPage - 1,
    });
  };
  useEffect(async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: state.currentMovie },
    });

    let noofpages = data.data.total_pages;
    data = data.data.results;
    let pages = [];
    for (let i = 1; i <= noofpages; i++) {
      pages.push(i);
    }
    setState({
      moviesData: data,
      currPage: 1,
      pageCount: pages,
    });


  }, [])

  const setPage = async (pageNumber) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageNumber,
        query: state.currentMovie,
      },
    });
    data = data.data.results;
    setState({
      moviesData: data,
      currPage: pageNumber,
    });
  };
 const  handleChange = async (q) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: q },
    });
    let noofpages = data.data.total_pages;
    data = data.data.results;
    let pages = [];
    for (let i = 1; i <= noofpages; i++) {
      pages.push(i);
    }
    setState({
      moviesData: data,
      currentMovie: q,
      pageCount: pages,
    });
  };
  return (
    <Router>
      <div id="root2">
        <Header handleChange={handleChange}></Header>

        <Switch>
          <Route path="/" exact>
            {state.moviesData.length == 0 ? (
              <h1>OOPS NO MOVIES FOUND !!!</h1>
            ) : (
              <React.Fragment>
                <Movies moviesData={state.moviesData}></Movies>
                <Pagination
                  nextPage={nextPage}
                  previousPage={previousPage}
                  setPage={setPage}
                  currPage={state.currPage}
                  page={state.pageCount}
                ></Pagination>
              </React.Fragment>
            )}
          </Route>

          <Route path="/favourites" exact component={Favourite}></Route>

          <Route path="/moviepage" exact component={MoviePage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App
