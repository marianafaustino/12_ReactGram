import './App.css';

//routes
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

//pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
