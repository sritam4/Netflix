import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey="fda40c64cfb857e6f81ce954501e9d95";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
// const upcoming="upcoming"; 
// const popular= "popular";
// const topRated= "top_rated";
// const nowPlaying= "now_playing";


const Card=({img})=>{
  return(
    <img className='card' src={img} alt="cover" />
  )
}

const Row = ({title,arr})=>(
  <div className='row'>
    <h2>{title}</h2>

    <div>
      {arr.map((item,e)=>{
        return(
          <Card key={e} img={`${imgUrl}/${item.poster_path}`}/>
        )
      })}
    </div>
  </div>
)


const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  const funcApiArr=["upcoming","popular","top_rated","now_playing"];
  const setFunctions=[setUpcomingMovies,setPopularMovies,setTopRatedMovies,setNowPlayingMovies];

  // useEffect(()=>{{
  //   const fetchUpcoming = async()=>{
  //     const {data: {results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
  //     setUpcomingMovies(results)
  //     // console.log(upcomingMovies);
      
  //   };
  //   const fetchPopular = async()=>{
  //     const {data: {results}}= await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
  //     setPopularMovies(results);
      
  //   };
  //   const fetchTopRated = async()=>{
  //     const {data: {results}}= await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
  //     setTopRatedMovies(results)
  //     // console.log(upcomingMovies);
      
  //   };
  //   const fetchNowPlaying = async()=>{
  //     const {data: {results}}= await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
  //     setNowPlayingMovies(results)
  //     // console.log(upcomingMovies);
      
  //   };
  
  //   fetchUpcoming();
  //   fetchPopular();
  //   fetchTopRated();
  //   fetchNowPlaying();
  // },[])}

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
          <button><BiPlay></BiPlay>Play</button>
          <button>My List <AiOutlinePlus></AiOutlinePlus></button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies}></Row>
      <Row title={"Populars"} arr={popularMovies}></Row>
      <Row title={"Top Rated"} arr={topRatedMovies}></Row>
      <Row title={"Now Playing"} arr={nowPlayingMovies}></Row>

      <div className="genrebox">
        {genre.map((item)=>(
          <Link key={item.id} to={'/genre/${item.id'}>{item.name}</Link>
        ))}
      </div>

    </section>
  )
}

export default Home