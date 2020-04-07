const initialState = {
  students: [
    {
      fname: '',
      lname: '',
      email: '',
      password: '',
      phone: '',
      school_info: [{}],
      work_exp: [{}],
      skill: []
    }
  ]
};

const getStudents = (state = initialState, action) => {
  switch (action.type) {
    case 'getAllStudents': {
      const objret = Object.assign({}, state.getAllStudents, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getStudents;
