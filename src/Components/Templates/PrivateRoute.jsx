import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const auth = useSelector(state => state.auth)
    const location = useLocation()
    localStorage.setItem('lastPage', location.pathname)

  return (
        auth.token === '' 
            ? <Navigate to={'/login'} replace={true} />
            : (
              <div className='mt-10 lg:mt-20'>
                <Outlet />
              </div>
            )
  )
}

export default PrivateRoute