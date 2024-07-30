import React from 'react'
import { Link } from 'react-router-dom'

const Not_found = () => {
  return (
    <div className="errorSection">
        <Link to='/' style={{fontSize:'1.5rem', color:'darkblue'}}> Go Back</Link>
    <h1>404</h1>
    <div>Page Not Found</div>
    </div>
  )
}

export default Not_found
