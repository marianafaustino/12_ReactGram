import "./Navbar.css"
import {NavLink} from 'react-router-dom'

const Navbar = () => {
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
     
      </ul>
    </nav>
  )
}

export default Navbar