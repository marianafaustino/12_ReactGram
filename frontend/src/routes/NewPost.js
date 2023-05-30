import { useEffect, useState } from 'react'
import Input from '../form/Input'
import ButtonSubmit from '../form/ButtonSubmit'
import { useFetch } from '../hooks/useFetch'
import './NewPost.css'
import {useAuthValue} from '../context/AuthContext'

const NewPost = () => {

    const [formError, setFormError] = useState()
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("Sem título")
    const { error,runFetch} = useFetch()
    const {user} = useAuthValue()

    const publicar = (e)=>{
      e.preventDefault()
      
      const erros = []

      if(!title || !image){
        erros.push("Preencha todos os campos")

      }

      setFormError(erros)
      if(erros.length){
       return
      }

      runFetch({ url:'/photos/',  metodo:'POST', body: {
        title: title,
        image: image
      }
    })
    }
    
    useEffect(()=> {
      setFormError(error)
    }, [error])
   
  return (
    <div className='newpost-div'>
      <div className='newpost-title'>
        {user && <p>{user.name}</p>}
      </div>
      <div className='newpost-content'>

        <span>Compartilhe algum momento seu:</span>
        <form onSubmit={publicar}>
          
          <p>Título para a imagem:</p>
          <Input
          type='text'
          id='title'
          placeholder='Título'
          onChange={setTitle}
          />
          <p>Imagem:</p>
          <Input
          type='file'
          id='image'
          placeholder='Url da imagem'
          onChange={setImage}
          />
        <ButtonSubmit nomeBotao='Publicar'/>
        {formError && formError.map(erro =>(<p className="erro">{erro}</p>))}
        
        </form>
      </div>
      <div className='newpost-title'>
        Fotos publicadas:
      </div>
    </div>
  )
}

export default NewPost