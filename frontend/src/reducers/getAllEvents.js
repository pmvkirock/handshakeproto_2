const initialState = {
  events: [
    {
      idcompany: '',
      title: '',
      deadline: '',
      location: '',
      salary: '',
      desc: '',
      eligibility: '',
      posting_date: '',
      date: '',
      time: ''
    }
  ]
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getAllEvents': {
      const objret = Object.assign({}, state.getAllEvents, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
