import './Photo.css'
import { uploads } from '../../utils/config'

//components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'

//hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//redux
import { getPhoto, like } from '../../slices/photoSlice'
import LikeContainer from '../../components/LikeContainer'

const Photo = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {photo, loading, error, message} = useSelector((state)=> state.photo)

    //comentarios

    //load photo data
    useEffect(()=>{
      dispatch(getPhoto(id))
    },[dispatch, id])

    const handleLike = ()=>{
      dispatch(like(photo._id))
    }

    if(loading){
      return <p>Carregando...</p>
    }
  return (
    <div id='photo'>
      <PhotoItem photo={photo}/>
      <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
    </div>
  )
}

export default Photo