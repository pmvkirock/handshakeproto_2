const initialState = {
  jobs: [
    {
      idjob: { title: '', location: '' },
      idcompany: '',
      idstudent: '',
      status: ''
    }
  ]
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getMyJobs': {
      const objret = Object.assign({}, state.getMyJobs, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
