import axios from 'axios';

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'getAllStudents', value: obj };
};

export const getStudents = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    var url;
    console.log(data);
    url =
      'http://localhost:8000/students/getAllStudents?limit=10&skip=' +
      data.page +
      '&name=' +
      data.name +
      '&sname=' +
      data.sname +
      '&major=' +
      data.major +
      '&skill=' +
      data.skill;
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
              students: [...response.data.docs],
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
