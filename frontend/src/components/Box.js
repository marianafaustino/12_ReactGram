import "./Box.css"

const Box = ({children, title, subtitle, width, height}) => {
  return (
    <div className="box" style={{width, height}}>
       <div className='box-title'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
      </div>  
           <div className="box-content">
           {children}
            </div>     
     
    </div>
  )
}

export default Box