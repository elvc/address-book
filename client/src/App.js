import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import styled, { injectGlobal } from 'styled-components';
import ContactListItems from '../src/Components/ContactListItems';
import ContactDetails from '../src/Components/ContactDetails';

// Styled-Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
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
  border: 1px grey solid;
`;

const ContactListWrapper = styled.div`
  padding: 1rem;
  border-right: 1px grey solid;
`;

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

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
      this.setState({
        contacts: res.data.getAllContacts,
      });
    });
  };

  componentDidMount() {
    this.getAllContacts();
  }

  render() {
    const { contacts } = this.state;
    return (
      <AppContainer>
        <AppHeaderWrapper>
          <AppHeader>Address Book</AppHeader>
        </AppHeaderWrapper>
        <AddressBookWrapper>
          <ContactListWrapper>
            <ContactListItems contacts={contacts} />
          </ContactListWrapper>
          <ContactDetails contact={contacts[0]} />
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
