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
    case 'SET_ALL_CONTACTS':
      return {
        ...state,
        allContact: action.payload,
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        allContact: state.allContact.map(
          contact =>
            contact.contactId === action.payload.contactId
              ? action.payload
              : contact,
        ),
      };

    case 'TOGGLE_EDIT_CONTACT':
      return {
        ...state,
        isEditingContact: !state.isEditingContact,
      };
    default:
      return state;
  }
};

export default addressbook;
