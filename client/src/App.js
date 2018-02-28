import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createApolloFetch } from 'apollo-fetch';
import styled, { injectGlobal } from 'styled-components';
import { Router } from 'react-router-dom';
import ContactListItems from '../src/Components/ContactListItems';
import ContactDetails from '../src/Components/ContactDetails';
import history from './history';

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

const AppHeader = styled.h1`
  text-align: center;
  width: 800px;
`;

const AddressBookWrapper = styled.div`
  display: flex;
  width: 800px;
  height: 600px;
  border: 1px grey solid;
  border-radius: 5px;
`;

const EmptyPlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 5;
  height: 100%;
`;
// End of Styled Components

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  componentDidMount() {
    this.getAllContacts();
  }

  componentWillReceiveProps(nextProps) {
    // need to generate routes and store to redux after we get all contacts
    if (nextProps.allContacts !== this.props.allContacts) {
      this.routesGenerator(nextProps.allContacts);
    }
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
      this.props.dispatch({
        type: 'SET_ALL_CONTACTS',
        payload: res.data.getAllContacts,
      });
    });
  };

  // generate all the routes based on however many contacts we have
  routesGenerator = allContacts => {
    const routes = [
      {
        path: `/`,
        exact: true,
        main: () => (
          <EmptyPlaceHolder>Please select a contact to start</EmptyPlaceHolder>
        ),
      },
    ];
    allContacts.forEach(contact => {
      routes.push({
        path: `/contact/${contact.contactId}`,
        main: () => <ContactDetails />,
      });
    });
    this.props.dispatch({ type: 'SET_ROUTES', payload: routes });
  };

  render() {
    return (
      <AppContainer>
        <AppHeader>Address Book</AppHeader>
        <AddressBookWrapper>
          <Router history={history}>
            <ContactListItems />
          </Router>
        </AddressBookWrapper>
      </AppContainer>
    );
  }
}

App.propTypes = {
  allContacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      contactId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allContacts: state.addressBook.allContacts,
});

export default connect(mapStateToProps)(App);

// Global style for Styled-components
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    width: 100%;
  }
`;
