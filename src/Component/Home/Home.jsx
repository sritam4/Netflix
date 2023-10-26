import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive'
import {key as apiKey, url, imgUrl} from '../../config'
import {Row} from "../../config"


const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  const funcApiArr=["upcoming","popular","top_rated","now_playing"];
  const setFunctions=[setUpcomingMovies,setPopularMovies,setTopRatedMovies,setNowPlayingMovies];
  const isSmall = useMediaQuery({query:'(max-width : 450px)'});
  useEffect(()=>{
    const func = (funcapi,setfunc) =>{
      const fname = async()=>{
        const {data: {results}}= await axios.get(`${url}/movie/${funcapi}?api_key=${apiKey}`);
        setfunc(results);
      }
      fname();

      const getAllGenere = async()=>{
        const {data:{genres}}= await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
        setGenre(genres);
      };
      getAllGenere();
    };

    funcApiArr.forEach((item,index)=>{
      func(item,setFunctions[index]);
    })

  },[]);



  return (
    <section className='home'>
      <div className='banner'style={{
        backgroundImage: popularMovies[0]? `url(${imgUrl}/${popularMovies[0].poster_path})`: 'none'
      }}>
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        
        <div>
          {isSmall&&<button key={3} className='info-icon'><AiOutlineInfoCircle></AiOutlineInfoCircle>Info</button>}
          <button key={2}><BiPlay></BiPlay>Play</button>
          <button key={1}><AiOutlinePlus></AiOutlinePlus>My List</button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies}></Row>
      <Row title={"Populars"} arr={popularMovies}></Row>
      <Row title={"Top Rated"} arr={topRatedMovies}></Row>
      <Row title={"Now Playing"} arr={nowPlayingMovies}></Row>

      <div className="genrebox">
        {genre?.map((item)=>(
          <Link key={item.id} to={'/genre/${item.id'}>{item.name}</Link>
        ))}
      </div>

    </section>
  )
}

export default Home