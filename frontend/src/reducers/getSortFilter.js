const sortFilter = (state = '', action) => {
  switch (action.type) {
    case 'sortFilter':
      return action.newState;
    default:
      return state;
  }
};

export default sortFilter;
