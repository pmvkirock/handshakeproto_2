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
    case 'getOtherCompany': {
      const objret = Object.assign({}, state.getOtherCompany, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
