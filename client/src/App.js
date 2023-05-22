import './App.css';
import Start from './components/Landing/Start';
import Home from './components/Home/Home'
import Detail from './components/Detail/Details';
import Create from './components/Create/Create';
import About from './components/About/About.jsx';
import Error from './components/Error/Error'
import {Routes, Route,} from 'react-router-dom';


function App() {
  return (
    <div className="App">      
      <Routes>           
            <Route exact path="/" element={<Start/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/dogs/:id" element={<Detail/>}/>     
            <Route path='/dogs' element={<Create/>}/>      
            <Route path='/about' element={<About/>}/>
            <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
