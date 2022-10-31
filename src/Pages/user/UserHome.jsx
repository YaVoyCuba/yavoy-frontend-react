import React from 'react'
import { useParams } from 'react-router-dom'



export const UserHome = () => {

    const params = useParams();
  return (
    <div>{console.log(params.loggedIn)}</div>
  )
}
