const initialState = {
  jobs: [
    {
      title: '',
      deadline: '',
      location: '',
      salary: '',
      post: '',
      paid: '',
      job_cat: '',
      posting_date: ''
    }
  ]
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getAllJobs': {
      const objret = Object.assign({}, state.getAllJobs, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
