import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import styled, { injectGlobal } from 'styled-components';
import ContactListItems from '../src/Components/ContactListItems';
import ContactDetails from '../src/Components/ContactDetails';

// Styled-Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AppHeaderWrapper = styled.header``;
const AppHeader = styled.h1`
  text-align: center;
`;

const AddressBookWrapper = styled.div`
  display: flex;
  width: 800px;
  height: 600px;
  border: 1px grey solid;
`;

const ContactListWrapper = styled.div`
  padding: 1rem;
  border-right: 1px grey solid;
  width: 300px;
`;

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  getAllContacts = () => {
    fetch({
      query: `{getAllContacts {
      contactId
      firstName
      lastName
      email
      address
      phone
    }}`,
    }).then(res => {
      this.props.dispatch({
        type: 'SET_ALL_CONTACTS',
        payload: res.data.getAllContacts,
      });
    });
  };

  componentDidMount() {
    this.getAllContacts();
  }

  render() {
    return (
      <AppContainer>
        <AppHeaderWrapper>
          <AppHeader>Address Book</AppHeader>
        </AppHeaderWrapper>
        <AddressBookWrapper>
          <ContactListWrapper>
            <ContactListItems />
          </ContactListWrapper>
          <ContactDetails />
        </AddressBookWrapper>
      </AppContainer>
    );
  }
}

export default App;

// Global style
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;
