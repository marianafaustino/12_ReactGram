import Box from "../components/Box"
import ButtonSubmit from "../form/ButtonSubmit"
import Input from "../form/Input"
import { useFetch } from "../hooks/useFetch"
import "../routes/Cadastrar.css"
import {useEffect, useState} from "react"
  

const Cadastrar = () => {
      const [nome, setNome] = useState("")
      const [email, setEmail] = useState("")
      const [senha, setSenha] = useState("")
      const [confirmaSenha, setConfirmaSenha] = useState("")
      const [formError, setFormError] = useState([])
  
      const { error, runFetch } = useFetch()
  
      const enviarFormulário = (e)=>{
          e.preventDefault()
  
          const erros = []
  
          if(!nome || !email || !senha || !confirmaSenha){
              erros.push("Preencha todos os campos")
  
          }  if(nome.length <= 3){
              erros.push("O nome precisa ter mais de 3 caracteres")
  
          }  if(senha.length < 6 || confirmaSenha.length < 6){
              erros.push("A senha precisa ter no mínimo 6 caracteres")
          }  if(confirmaSenha != senha){
              erros.push("As senhas precisam ser iguais")
          }
  
          setFormError(erros)
          if(erros.length){
             return
          }
  
       
          runFetch({ url: '/users/register',  metodo:'POST', body: {
              name: nome,
              email: email,
              password: senha,
              confirmpassword: confirmaSenha
           }
         })
      }
  
      useEffect(()=> {
          setFormError(error)
      }, [error])
      
  
    return (
      <Box title='ReactGram'
      subtitle='Cadastre-se para ver as fotos dos seus amigos'
      width='50%'
      height='50%'
      msgRedirect='Já tem conta?'
      >
          <form onSubmit={enviarFormulário}>
         
                    <Input type='text' id='nome' placeholder='Nome' onChange={setNome}/>
               
                    <Input type='email' id='email' placeholder='Email' onChange={setEmail}/>
                
                    <Input type='password' id='senha' placeholder='Senha' onChange={setSenha}/>
                
                    <Input type='password' id='confirmaSenha' placeholder='Confirme sua senha' onChange={setConfirmaSenha}/>
             
                    <ButtonSubmit nomeBotao='Cadastrar' />
                    {formError && formError.map(erro =>(<p className="erro">{erro}</p>))}
               
            </form>
            </Box>
    )
  }

export default Cadastrar