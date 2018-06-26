import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import neighborhoodAges from './neighborhoods-through-the-ages';
import classSizeAndQuality from './class-size-and-quality';
import magnitudeCampsiteSweeps from './magnitude-of-urban-campsite-sweeps';
import exploreUrbanCampsiteSweeps from './explore-urban-campsite-sweeps';
import studentEnrollmentTrends from './student-enrollment-trends';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    magnitudeCampsiteSweeps,
    exploreUrbanCampsiteSweeps,
    neighborhoodAges,
    classSizeAndQuality,
    studentEnrollmentTrends,
    ...asyncReducers,
  });
}
