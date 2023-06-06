import { useEffect, useState } from 'react'
import Input from '../form/Input'
import ButtonSubmit from '../form/ButtonSubmit'
import { useFetch } from '../hooks/useFetch'
import './NewPost.css'
import {useAuthValue} from '../context/AuthContext'

const NewPost = () => {

    const [formError, setFormError] = useState()
    const [image, setImage] = useState()
    const [title, setTitle] = useState("Sem título")
    const { error,runFetch} = useFetch()
    const {user} = useAuthValue()
    const [userPosts, setUserPosts] = useState([])
   // const imgUrl= URL.createObjectURL(image.name)
  

    const publicar = (e)=>{
      e.preventDefault()
      
      const erros = []
      const formData = new FormData()
      formData.append('image', image)
      formData.append('title', title)
      formData.append('userId', user.userId)

      if(!title || !image){
        erros.push("Preencha todos os campos")

      }

      setFormError(erros)
      if(erros.length){
       return
      }

      runFetch({ 
        url:'/photos/',  
        metodo:'POST', 
        onSucess: loadPosts,
        formData: formData
    })
    }
    
    useEffect(()=> {
      setFormError(error)
    }, [error])

    const loadPosts = ()=> {
      runFetch({ 
        url:'/photos/user/'+ user.userId,
        onSucess: setUserPosts,
        onError: onErrorUploadPhotos
      })
    }

    const onErrorUploadPhotos = (error)=> {
      setFormError(error)
    }

    useEffect(loadPosts,[])

    console.log(image)

    
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
          onChange={setImage}
          />
        <ButtonSubmit nomeBotao='Publicar'/>
        {formError && formError.map(erro =>(<p className="erro">{erro}</p>))}
        
        </form>
      </div>
      <div className='newpost-title'>
        Fotos publicadas:
      {userPosts.map((post)=>(
        <div>
          <p>{post.title}</p>
          <img src={post.image} alt="Imagem" />
          
        </div>
      ))}
      </div>
    </div>
  )
}

export default NewPost