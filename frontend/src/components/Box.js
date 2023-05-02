import "./Box.css"

const Box = ({children, title, subtitle, width, height, msgRedirect, linkRedirect}) => {
  return (
    <div className="box" style={{width, height}}>
       <div className='box-title'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
      </div>  
           <div className="box-content">
           {children}
            </div>     
     <p className="box-redirect">{msgRedirect} <a href={linkRedirect}>Clique aqui.</a></p>
    </div>
  )
}

export default Box