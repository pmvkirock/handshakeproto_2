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
    case 'LoadProfileData': {
      const objret = Object.assign({}, state.getProfileInfo, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
