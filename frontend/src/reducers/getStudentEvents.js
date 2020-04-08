const initialState = {
  events: [
    {
      idjob: { title: '', location: '' },
      idcompany: '',
      idstudent: ''
    }
  ]
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getMyEvents': {
      const objret = Object.assign({}, state.getMyEvents, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
