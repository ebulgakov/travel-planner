import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import createTypedStructuredSelector from '../common/createTypedStructuredSelector'
import Loading from '../components/Loading/Loading'
import { IUser } from '../types/user'
import { authUpdatedStatusSelector, userSelector } from './authSelector'

interface IPrivateProps {
  isPrivate: boolean
}

interface ISelectedProps {
  user: IUser
  isAuthUpdated: boolean
}

const Private: React.FC<IPrivateProps & ISelectedProps> = ({ children, isPrivate, user, isAuthUpdated }) => {
  if (!isAuthUpdated) {
    return <Loading fullPage />
  }

  if (!user && isPrivate) {
    return <Redirect to="/auth/signin" />
  }

  if (user && !isPrivate) {
    return <Redirect to="/service/trips" />
  }

  return <>{children}</>
}

export default connect(
  createTypedStructuredSelector<ISelectedProps>({
    user: userSelector,
    isAuthUpdated: authUpdatedStatusSelector,
  })
)(Private)
