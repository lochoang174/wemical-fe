import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectDemo = () => {
    const navigate = useNavigate()
  useEffect(()=>{
    navigate("demo")
  },[])
    return (
    <div>
      
    </div>
  )
}

export default RedirectDemo
