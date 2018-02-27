const initialState = {
  selectedContact: {},
  allContacts: [],
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
        allContacts: action.payload,
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        allContacts: state.allContacts.map(
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
