import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div>
      <h1>Not found</h1>
      <p>Register now to use<Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default Notfound
