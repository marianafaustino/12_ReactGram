import { useFetch } from "../hooks/useFetch"
import "../routes/Cadastrar.css"
import {useEffect, useState} from "react"

const FormCadastrar = () => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")
    const [formError, setFormError] = useState([])

    const { data, error, runFetch } = useFetch()

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

     
        runFetch({ url: '/users/register',  method:'POST', body: {
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
    <div>
        <form onSubmit={enviarFormulário}>
              
              <div className='titleForm'>
                  <h1>ReactGram</h1>
                  <p>Cadastre-se para ver as fotos dos seus amigos</p>
              </div>  
              
              <label>
                  <input 
                  type="text"
                  id="nome" 
                  placeholder='Nome'
                  required
                  className='input'
                  onChange={(e)=> setNome(e.target.value)}/>
              </label>
              <label>
                  <input 
                  type="email" 
                  id="email"
                  placeholder='Email'
                  required 
                  className='input'
                  onChange={(e)=> setEmail(e.target.value)}/>
              </label>
              <label>
                  <input 
                  type="password"
                  id="senha"
                  placeholder='Digite uma senha'
                  required 
                  className='input'
                  onChange={(e)=> setSenha(e.target.value)}/>
              </label>
              <label>
                  <input type="password"
                  id="confirmaSenha"
                  placeholder='Confirme sua senha'
                  required 
                  className='input'
                  onChange={(e)=> setConfirmaSenha(e.target.value)} />
              </label>
              <button type="submit" className="btn-submit">Cadastrar</button>
              {formError && formError.map(erro =>(<p className="erro">{erro}</p>))}
             
          </form>
    </div>
  )
}

export default FormCadastrar