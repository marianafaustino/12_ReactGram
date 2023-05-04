import { useAuthValue } from "../context/AuthContext"
import "./Navbar.css"
import {NavLink, useNavigate} from 'react-router-dom'

const Navbar = () => {

  const {tokenUser, setTokenUser} = useAuthValue()

  const navigate = useNavigate()


  return (
    <nav className='navbar'>
      <NavLink to="/" className='brand'>
        <span>ReactGram</span>
      </NavLink>
      <ul className='links-list'>
        <li>
        <NavLink to="/" >Início</NavLink>
        </li>

          <li>
        <NavLink to="/login" >Entrar</NavLink>
        </li>

        <li>
        <NavLink to="/register">Cadastrar</NavLink>
        </li>

        {tokenUser && <li>
        
          <button className="btn-nav" onClick={()=> {
            setTokenUser(undefined)
            navigate('/login')
            }}>Sair</button>
          
          </li>}

      </ul>
    </nav>
  )
}

export default Navbar