import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { userSelector } from '../auth/authSelector'
import createTypedStructuredSelector from '../common/createTypedStructuredSelector'
import useThunkDispatch from '../common/useThunkDispatch'
import Loading from '../components/Loading/Loading'
import { ITrip } from '../types/trip'
import { IUser } from '../types/user'
import EditTrip from './EditTrip'
import { requestReadTripDetails } from './tripActions'
import { tripSelector } from './tripSelector'

interface IRouteParams {
  id: string
}

interface ISelectedProps {
  user: IUser
  trip: ITrip
}

const Trip: React.FC<RouteComponentProps<IRouteParams> & ISelectedProps> = ({ match, user, trip }) => {
  const id = String(match.params.id)
  const [loading, setLoading] = useState(true)
  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(requestReadTripDetails(id)).then(() => setLoading(false))
  }, [dispatch, id])

  if (loading) {
    return <Loading fullPage />
  }

  if (!trip.exists) {
    return (
      <div className="container">
        <div className="trip">
          <div className="trip_title">
            <Link to="/service/trips" className="trip_back">
              &larr; Back to list
            </Link>
            <h1>Trip Not Exists</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="trip">
        <div className="trip_title">
          <Link to="/service/trips" className="trip_back">
            &larr; Back to list
          </Link>
          <h1>{trip.destination}</h1>
        </div>
      </div>

      {trip.uid === user.uid && <EditTrip />}

      <div className="trip_content">
        <dl className="trip_field">
          <dt>Start Date:</dt>
          <dd>{new Date(trip.startDate).toLocaleDateString()}</dd>
        </dl>
        <dl className="trip_field">
          <dt>End Date:</dt>
          <dd>{new Date(trip.endDate).toLocaleDateString()}</dd>
        </dl>
        <dl className="trip_field">
          <dt>Comment:</dt>
          <dd>{trip.comment}</dd>
        </dl>
      </div>
    </div>
  )
}

export default connect(
  createTypedStructuredSelector<ISelectedProps>({
    user: userSelector,
    trip: tripSelector,
  })
)(Trip)
