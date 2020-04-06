const initialState = {
  appli: []
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getApplied': {
      const objret = Object.assign({}, state.getApplied, action.value);
      return objret;
    }
    default:
      console.log(state);
      return state;
  }
};

export default getProfileInfo;
