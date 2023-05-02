
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Cadastrar from './routes/Cadastrar';
import Login from './routes/Login';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Cadastrar/>}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
