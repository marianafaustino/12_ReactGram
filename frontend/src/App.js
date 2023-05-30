
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Cadastrar from './routes/Cadastrar';
import Login from './routes/Login';
import Feed from './routes/Feed';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import NewPost from './routes/NewPost';

function App() {

  const [tokenUser, setTokenUser] = useState(undefined)
  const [user, setUser] = useState(undefined)
  
  return (
    <div className="App">
      <AuthProvider value={{tokenUser, setTokenUser, user, setUser}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Cadastrar/>}/>
          <Route path='/post' element={<NewPost/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
