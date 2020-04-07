import { combineReducers } from 'redux';
import getType from './getType';
import getJobFilterPartFull from './getJobFilterPartFull';
import getJobFilter from './getJobFilter';
import getCityFilter from './getCityFilter';
import getStudFilter from './getStudFilter';
import getSchoolFilter from './getSchoolFilter';
import getMajorFilter from './getMajorFilter';
import getEventsFilter from './getEventFilter';
import getMajor from './getMajor';
import getProfPic from './getProfPic';
import getFName from './getFName';
import getFilterSkill from './getSkillFilter';
import getProfileInfo from './getProfileInfo';
import getCompProfile from './getCompProfile';
import getAllJobs from './getAllJobs';
import getSortFilter from './getSortFilter';
import getApplied from './getApplied';
import getAllEvents from './getAllEvents';
import getEventsApplied from './getEventsApplied';

const allReducers = combineReducers({
  getType: getType,
  getJobFilterPartFull: getJobFilterPartFull,
  getJobFilter: getJobFilter,
  getCityFilter: getCityFilter,
  getStudFilter: getStudFilter,
  getSchoolFilter: getSchoolFilter,
  getMajorFilter: getMajorFilter,
  getEventsFilter: getEventsFilter,
  getMajor: getMajor,
  getProfPic: getProfPic,
  getFName: getFName,
  getFilterSkill: getFilterSkill,
  getProfileInfo: getProfileInfo,
  getCompProfile: getCompProfile,
  getAllJobs: getAllJobs,
  getSortFilter: getSortFilter,
  getApplied: getApplied,
  getAllEvents: getAllEvents,
  getEventsApplied: getEventsApplied
});

export default allReducers;
