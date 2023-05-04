import React, { useState, useEffect } from 'react'
import Box from '../components/Box'
import Input from '../form/Input'
import { useFetch } from '../hooks/useFetch'
import ButtonSubmit from '../form/ButtonSubmit'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../context/AuthContext'

const Login = () => {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [formError, setFormError] = useState([])

  const {dados, error,runFetch} = useFetch()

  const {tokenUser, setTokenUser} = useAuthValue()

  const navigate = useNavigate()

  const enviarFormulário = (e)=>{
    e.preventDefault()

    const erros = []

    if(!email || !senha){
        erros.push("Preencha todos os campos")

    } if(senha.length < 5){
        erros.push("A senha precisa ter no mínimo 6 caracteres")
    }

    setFormError(erros)
    if(erros.length){
       return
    }

 
    runFetch({ url: '/users/login',  metodo:'POST', body: {
        email: email,
        password: senha
      }
    })
  }

    useEffect(()=> {
      setFormError(error)
    }, [error])

    useEffect(()=>{
      if(dados != undefined){
          setTokenUser(dados.token)
          navigate("/")

      }
      
    },[dados])

  return (
    <Box
    title='ReactGram'
    subtitle='Faça o login para ver o que há de novo.'
    msgRedirect='Não tem uma conta?'
    linkRedirect='http://localhost:3000/register'
    width='50%'
    height='50%'>

      <form onSubmit={enviarFormulário}>

        <Input
          type='email'
          id='email'
          placeholder='Email'
          onChange={setEmail}
        />

        <Input
        type='password'
        id='senha'
        placeholder='Senha'
        onChange={setSenha}
        />

        <ButtonSubmit nomeBotao='Entrar'/>
        {formError && formError.map(erro =>(<p className="erro">{erro}</p>))}

      </form>
    </Box>
    
  )
}

export default Login