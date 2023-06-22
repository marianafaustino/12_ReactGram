import './Home.css'

//components
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

//hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

//redux
import { getPhotos, like } from '../../slices/photoSlice'

const Home = () => {

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage()
  const {user} = useSelector((state)=> state.auth)
  const {photos, loading} = useSelector((state)=> state.photo)

  //load all photos
  useEffect(()=>{
    dispatch(getPhotos())
  },[dispatch])

  //like a photo
  const handleLike = (photo)=>{
    dispatch(like(photo._id))
    resetMessage()
  }

  if(loading){
    <p>Carregando...</p>
  }

  return (
    <div>Home</div>
  )
}

export default Home