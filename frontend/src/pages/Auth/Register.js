import './Auth.css'

//componentes
import {Link} from 'react-router-dom'

//hooks
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"

//redux
import { register, reset } from '../../slices/authSlice'


const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()

  const {login, error} = useSelector((state)=> state.auth)

  const handleSubmit = (e)=>{
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)
    dispatch(register(user))
  }

  // clean all auth states
  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Nome' 
          onChange={(e)=> setName(e.target.value)} 
          value={name || ""} 
        />
        <input 
          type="email" 
          placeholder='Email' 
          onChange={(e)=> setEmail(e.target.value)} 
          value={email || ""} 
        />
        <input 
          type="password" 
          placeholder='Senha' 
          onChange={(e)=> setPassword(e.target.value)} 
          value={password || ""} 
        />
        <input 
          type="password" 
          placeholder='Confirme sua senha' 
          onChange={(e)=> setConfirmPassword(e.target.value)} 
          value={confirmPassword || ""} 
        />
        <input 
          type="submit" 
          value="Cadastrar" 
        />
      </form>

      <p>Já tem conta? <Link to='/login'>Clique aqui</Link>.</p>
    </div>
  )
}

export default Register