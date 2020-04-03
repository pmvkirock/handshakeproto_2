import axios from 'axios';

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'getAllJobs', value: obj };
};

export const getJobData = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
    axios
      .get('http://localhost:8000/jobs/getAllJobs?skip=1&limit=10')
      .then(response => {
        console.log('Status Code : ', response.data);
        if (response.status === 200) {
          console.log(response.data);
          dispatch(
            loadProfileDataAsync({
              authFlag: true,
              loginStatus: 'success',
              error: false,
              jobs: [...response.data.docs],
              total: response.data.total,
              limit: response.data.limit,
              page: response.data.page,
              pages: response.data.pages
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