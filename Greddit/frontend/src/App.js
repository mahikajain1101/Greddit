
import './App.css';
import Login  from './Login'
import Register  from './Register'
import Mysg from './Mysg'
import Sg from './Sg'
import Savedpost from './Savedpost'
import Opensg from './Opensg'
import Users from './User'
import Joinreq from './Joinreq'
import Stats from './Stat'
import Report from './Report'
import Linksg from './Linksg'
import {useState} from "react";
// import Modal from './Modal';

import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from './Home';

function App() {
  const [page,setPage] = useState('login');

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={page === "login" ? <Login onFormSwitch={changePage} /> : <Register onFormSwitch={changePage} />}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/mysg' element={<Mysg/>}/>
      <Route path='/sg' element={<Sg/>}/>
      <Route path='/savedpost' element={<Savedpost/>}/>
      <Route path='/opensg' element={<Opensg/>}/>
      <Route path='/linksg' element={<Linksg/>}/>

      <Route path='/users' element={<Users/>}/>
      <Route path='/joinreq' element={<Joinreq/>}/>
      <Route path='/stats' element={<Stats/>}/>
      <Route path='/report' element={<Report/>}/>
    </Routes>
    </BrowserRouter>
   
    </>
    
  );
}

export default App;
