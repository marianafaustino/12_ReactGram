import React, { useState } from 'react'
import Box from '../components/Box'
import Input from '../form/Input'

const Login = () => {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  return (
    <Box
    title='ReactGram'
    subtitle='Faça o login para ver o que há de novo.'
    msgRedirect='Não tem uma conta?'
    width='50%'
    height='50%'>

      <form>

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

      </form>
    </Box>
    
  )
}

export default Login