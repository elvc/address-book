import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createApolloFetch } from 'apollo-fetch';
import styled, { injectGlobal } from 'styled-components';
import ContactListItems from '../src/Components/ContactListItems';
import ContactDetails from '../src/Components/ContactDetails';

// Styled-Components
const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AppHeaderWrapper = styled.header`
  width: 800px;
`;

const AppHeader = styled.h1`
  text-align: center;
`;

const AddressBookWrapper = styled.div`
  display: flex;
  width: 800px;
  height: 600px;
  border: 1px grey solid;
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

  routesGenerator = allContacts => {
    const routes = [];
    allContacts.forEach(contact => {
      routes.push({
        path: `/contact/${contact.contactId}`,
        exact: true,
        main: () => <ContactDetails />,
      });
    });
    this.props.dispatch({ type: 'SET_ROUTES', payload: routes });
  };

  componentDidMount() {
    this.getAllContacts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allContacts !== this.props.allContacts) {
      this.routesGenerator(nextProps.allContacts);
    }
  }

  render() {
    return (
      <AppContainer>
        <AppHeaderWrapper>
          <AppHeader>Address Book</AppHeader>
        </AppHeaderWrapper>
        <AddressBookWrapper>
          <ContactListItems />
        </AddressBookWrapper>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  allContacts: state.addressBook.allContacts,
});

export default connect(mapStateToProps)(App);

// Global style
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    width: 100%;
  }
`;
