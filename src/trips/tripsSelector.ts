import { get } from 'lodash/fp'
import { Selector } from '../types/common'
import { ITrip, IFilter } from '../types/trip'
import { compareAsc } from 'date-fns'
import { createSelector } from 'reselect'
import { userSelector } from '../auth/authSelector'

export const tripsSelector: Selector<ITrip[]> = get('trips.list')
export const filterTripsSelector: Selector<IFilter> = get('trips.filter')

export const filteredTripsSelector: Selector<ITrip[]> = createSelector(
  tripsSelector,
  filterTripsSelector,
  userSelector,
  (list, filter, user) =>
    list
      .filter((trip) => (filter.onlyMyTrips ? trip.uid === user.uid : true))
      .filter((trip) => trip.destination.toLowerCase().includes(filter.search.toLowerCase()))
      .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)))
)
