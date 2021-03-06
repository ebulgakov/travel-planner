import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { identity } from 'lodash/fp'
import { createAction } from 'redux-actions'

import { Action, ThunkAction } from '../types/common'
import { INewTrip, ITrip } from '../types/trip'

export const SET_TRIP = 'TRIP/SET'
export type SET_TRIP = Action<ITrip>
export const setTrip = createAction<ITrip, ITrip>(SET_TRIP, identity)

export const requestReadTripDetails = (id: string): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .get()
    .then((doc) => {
      dispatch(
        setTrip(({
          id: doc.id,
          exists: doc.exists,
          ...doc.data(),
        } as any) as ITrip)
      )
    })
    .catch((err) => Promise.reject(err))

export const requestUpdateTrip = (id: string, data: INewTrip): ThunkAction<Promise<void>> => (dispatch) =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .update(data)
    .then(() => dispatch(requestReadTripDetails(id)))
    .catch((err) => Promise.reject(err))

export const requestDeleteTrip = (id: string): ThunkAction<Promise<void>> => () =>
  firebase
    .firestore()
    .collection('trips')
    .doc(id)
    .delete()
    .catch((err) => Promise.reject(err))
