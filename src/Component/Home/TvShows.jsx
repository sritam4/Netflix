import { useState,useEffect } from "react";
import axios from "axios";
import { url,imgUrl,key as apiKey} from '../../config';
import {Row} from '../../config';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive'


const TvShows=()=>{

    const [airing_today, setairing_todayTvShows] = useState([]);
    const [popularTvShows, setPopularTvShows] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [on_the_airTvShows, seton_the_airTvShows] = useState([]);

    const funcApiArr=["airing_today","popular","top_rated","on_the_air"];
    const setFunctions=[setairing_todayTvShows,setPopularTvShows,setTopRatedTvShows,seton_the_airTvShows];
    const isSmall = useMediaQuery({query:'(max-width : 450px)'});

    useEffect(()=>{
        funcApiArr.forEach((item,index)=>{
            func(item,setFunctions[index]);
        })
    },[]);

    const func = (funcapi,setfunc) =>{
      const fname = async()=>{
        const {data: {results}}= await axios.get(`${url}/tv/${funcapi}?api_key=${apiKey}`);
        setfunc(results);
      }
      fname();
    };

    return(
        <section className='tvshows'>
            <div className='banner'style={{
                backgroundImage: popularTvShows[0]? `url(${imgUrl}/${popularTvShows[0].poster_path})`: 'none'
            }}>
                {popularTvShows[0] && <h1>{popularTvShows[0].name}</h1>}
                {popularTvShows[0] && <p>{popularTvShows[0].overview}</p>}
                
                <div>
                {isSmall&&<button key={3} className='info-icon'><AiOutlineInfoCircle></AiOutlineInfoCircle>Info</button>}
                <button key={2}><BiPlay></BiPlay>Play</button>
                <button key={1}><AiOutlinePlus></AiOutlinePlus>My List</button>
                </div>
            </div>

            <Row title={"Ariving today"} arr={airing_today}></Row>
            <Row title={"Populars TvShows"} arr={popularTvShows}></Row>
            <Row title={"Top Rated TvShows"} arr={topRatedTvShows}></Row>
            <Row title={"On The Air TvShows"} arr={on_the_airTvShows}></Row>

        </section>
    )
}
export default TvShows;