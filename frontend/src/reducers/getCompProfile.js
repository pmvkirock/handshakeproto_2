const initialState = {
  cname: '',
  location: '',
  email: '',
  website: '',
  desc: '',
  noofemp: '',
  owner_ship: '',
  company_type: '',
  prof_pic: ''
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'CompProfileInfo': {
      const objret = Object.assign({}, state.getProfileInfo, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
