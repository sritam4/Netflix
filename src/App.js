import './App.scss';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import TvShows from './Component/Home/TvShows';
import MyList from './Component/Home/MyList';

function App() {

  return <Router>

    <Header />

    <Routes>
      <Route path='/'element={<Home />}></Route>
      <Route path='/tvshows'element={<TvShows />}></Route>
      <Route path='/mylist'element={<MyList />}></Route>
    </Routes>

  </Router>
}

export default App;
