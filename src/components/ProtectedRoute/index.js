import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

import Header from '../Header'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined || jwtToken === '') {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <Route {...props} />
    </>
  )
}

export default ProtectedRoute
