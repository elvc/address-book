const initialState = {
  selectedContact: {},
  allContact: [],
  isEditingContact: false,
};

const addressbook = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CONTACT':
      return {
        ...state,
        selectedContact: {
          ...action.payload,
        },
      };
    case 'SET_EDIT_CONTACT':
      return {
        ...state,
        isEditingContact: true,
      };
    default:
      return state;
  }
};

export default addressbook;
