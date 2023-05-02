
import './App.css';
import Navbar from './components/Navbar';
import Cadastrar from './routes/Cadastrar';
import Login from './routes/Login';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Login/>
    </div>
  );
}

export default App;
