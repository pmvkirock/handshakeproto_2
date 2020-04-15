import axios from 'axios';

export const loadProfileDataAsync = obj => {
  console.log('Here in Async', obj);
  return { type: 'getAllEvents', value: obj };
};

export const getAllEvents = data => {
  console.log('Preapring for Launch', data);
  return dispatch => {
    var url;
    console.log(data);
    if (data.comp_id) {
      url =
        'events/getAllEvents?limit=10&skip=' +
        data.page +
        '&job=' +
        data.title +
        '&city=' +
        data.city +
        '&sort=' +
        data.sort +
        '&comp_id=' +
        data.comp_id;
    } else {
      url =
        'events/getAllEvents?limit=10&skip=' +
        data.page +
        '&job=' +
        data.title +
        '&city=' +
        data.city +
        '&sort=' +
        data.sort;
    }
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
              events: [...response.data.docs],
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
