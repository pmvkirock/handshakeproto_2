import axios from 'axios';

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'LoadProfileData', value: obj };
};

export const updateEdu = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
    axios
      .post('stud_profile/updateEduInfo', data)
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
