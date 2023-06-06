import './App.css';

//routes
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

//pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
        <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        </div>
      <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
