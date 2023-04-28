
const Input = ({type, id, placeholder, onChange}) => {
  return (
    <label>
         <input 
            type={type} 
            id={id}
            placeholder={placeholder}
            required 
            className='input'
            onChange={(e)=> onChange(e.target.value)}/>
    </label>
  )
}

export default Input