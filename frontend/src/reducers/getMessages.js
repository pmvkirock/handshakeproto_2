const initialState = {
  messages: [
    {
      senderid: '',
      recieverid: '',
      type: '',
      recievername: '',
      message: [{ content: '' }],
      sendername: ''
    }
  ]
};

const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'getAllMessages': {
      const objret = Object.assign({}, state.getAllMessages, action.value);
      return objret;
    }
    default:
      return state;
  }
};

export default getProfileInfo;
