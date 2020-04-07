const initialState = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  phone: '',
  school_info: [{}],
  work_exp: [{}],
  skill: []
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getOtherStudent': {
      const objret = Object.assign({}, state.getOtherStudent, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
