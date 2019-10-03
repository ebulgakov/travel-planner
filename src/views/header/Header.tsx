import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestLogout } from '../../auth/authActions'
import { userSelector } from '../../auth/authSelector'
import createTypedStructuredSelector from '../../common/createTypedStructuredSelector'
import { IUser } from '../../types/user'

interface ISelectedProps {
  user?: IUser
}

const Header: React.FC<ISelectedProps> = ({ user }) => {
  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch(requestLogout())
  }, [dispatch])

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header_logo">
          <div className="header_logo-left">Travel</div>
          <div className="header_logo-right">Planner</div>
        </Link>

        <div className="profile">
          {user ? (
            <>
              <div className="profile_user">
                <FontAwesomeIcon className="profile_user-icon" icon={faUser} />
                {user.displayName}
              </div>
              <button className="profile_logout" onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
          ) : (
            <Link to="/auth/signin">Sign In / Sign Up</Link>
          )}
        </div>
      </header>
    </div>
  )
}

export default connect(
  createTypedStructuredSelector<ISelectedProps>({
    user: userSelector,
  })
)(Header)
