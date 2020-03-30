import axios from 'axios';

export const CompanyType = () => {
  return {
    type: 'CompanyType'
  };
};

export const StudentType = () => {
  return {
    type: 'StudentType'
  };
};

export const PartTime = () => {
  return {
    type: 'PartTime'
  };
};

export const FullTime = () => {
  return {
    type: 'FullTime'
  };
};

export const Internship = () => {
  return {
    type: 'Internship'
  };
};

export const OnCampus = () => {
  return {
    type: 'OnCampus'
  };
};

export const Logout = () => {
  return {
    type: 'Logout'
  };
};

export const pending = () => {
  return {
    type: 'Pending'
  };
};

export const reviewed = () => {
  return {
    type: 'Reviewed'
  };
};

export const declined = () => {
  return {
    type: 'Declined'
  };
};

export const updateJobFilter = x => {
  return {
    type: 'filterJobUpdate',
    newState: x
  };
};

export const updateEventsFilter = x => {
  return {
    type: 'filterEventsUpdate',
    newState: x
  };
};

export const updateCityFilter = x => {
  return {
    type: 'filterCityUpdate',
    newState: x
  };
};

export const updateStudName = x => {
  return {
    type: 'filterStudName',
    newState: x
  };
};

export const updateSchoolName = x => {
  return {
    type: 'filterSchoolName',
    newState: x
  };
};

export const updateMajor = x => {
  return {
    type: 'filterMajor',
    newState: x
  };
};

export const updateSkill = x => {
  return {
    type: 'filterSkill',
    newState: x
  };
};

export const getMyJobs = () => {
  return {
    type: 'filterMyJobs'
  };
};

export const getAppliedEvents = () => {
  return {
    type: 'filterAppliedEvents'
  };
};

export const getMyEvents = () => {
  return {
    type: 'filterMyEvents'
  };
};

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'LoadProfileData', value: obj };
};

export const loadProfileData = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
    axios
      .post('http://localhost:8000/stud_profile/stud_profile', data)
      .then(response => {
        console.log('Status Code : ', response.data);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(
            loadProfileDataAsync({
              authFlag: true,
              loginStatus: 'success',
              error: false,
              ...response.data[0]
            })
          );
        } else {
          dispatch(
            loadProfileDataAsync({
              authFlag: false,
              loginStatus: 'failure',
              error: true
            })
          );
        }
      })
      .catch(error => {
        console.log('Inside exception throw!!');
        dispatch(
          loadProfileDataAsync({
            authFlag: false,
            loginStatus: 'failure',
            error: error
          })
        );
      });
  };
};
