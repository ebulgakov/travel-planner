import * as firebase from 'firebase/app'
import 'firebase/auth'
import { identity } from 'lodash/fp'
import { batch } from 'react-redux'
import { createAction } from 'redux-actions'

import { Action, ThunkAction } from '../types/common'
import { IAuthUser, IUser } from '../types/user'

export const SET_USER = 'AUTH/SET_USER'
export type SET_USER = Action<IUser>
export const setUser = createAction<IUser, IUser>(SET_USER, identity)

export const SET_AUTH_UPDATED = 'AUTH/SET_AUTH_UPDATED'
export type SET_AUTH_UPDATED = Action<boolean>
export const setAuthUpdated = createAction<boolean, boolean>(SET_AUTH_UPDATED, identity)

export const CLEAR_STATE = 'CLEAR_STATE'
export type CLEAR_STATE = Action<null>
export const clearState = (): ThunkAction<void> => (dispatch) => {
  dispatch({ type: CLEAR_STATE, payload: null })
}

export const requestCurrentUser = (): ThunkAction<void> => (dispatch) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUser(({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        } as any) as IUser)
      )
    }
    dispatch(setAuthUpdated(true))
    unsubscribe()
  })
}

export const requestLogout = (): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      batch(() => {
        dispatch(clearState())
        dispatch(setAuthUpdated(true))
      })
    })

export const requestSignIn = (userData: IAuthUser): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(({ user }) => {
      if (user) {
        dispatch(setUser(user as IUser))
      }
    })
    .catch((err) => Promise.reject(err))

export const requestSignUp = (newUser: IAuthUser): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(({ user }) => {
      if (user) {
        user
          .updateProfile({
            displayName: newUser.displayName,
          })
          .then(() => {
            dispatch(setUser(user as IUser))
          })
          .catch((err) => Promise.reject(err))
      }
    })
    .catch((err) => Promise.reject(err))
