import axios from 'axios';

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'getEventsApplied', value: obj };
};

export const getApplied = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    var url;
    console.log(data);
    url =
      'http://localhost:8000/events/getEventsApplied?comp_id=' +
      data.comp_id +
      '&job_id=' +
      data.job_id;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
    axios
      .get(url)
      .then(response => {
        console.log('Status Code : ', response.data);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(
            loadProfileDataAsync({
              authFlag: true,
              loginStatus: 'success',
              error: false,
              appli: [...response.data]
            })
          );
        } else {
          console.log(response.data);
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
