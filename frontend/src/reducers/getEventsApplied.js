const initialState = {
  appli: []
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getEventsApplied': {
      const objret = Object.assign({}, state.getEventsApplied, action.value);
      return objret;
    }
    default:
      console.log(state);
      return state;
  }
};

export default getProfileInfo;
