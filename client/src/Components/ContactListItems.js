import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Fuse from 'fuse.js';
import { createApolloFetch } from 'apollo-fetch';
import styled from 'styled-components';
import ContactDetails from './ContactDetails';

// Styled Components
const ContactListContainer = styled.div`
  display: flex;
  height: 100%;
`;

const SideBarHeading = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  -webkit-appearance: none;
  display: block;
  width: 200px;
  height: 30px;
  color: grey;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding-left: 1rem;
  border-radius: 30px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  padding: 1rem;
  &:visited {
    color: black;
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  background: #ddd;
  padding: 1rem;
  flex: 1;
  border-radius: 5px 0 0 5px;
`;

const ContactDetailsWrapper = styled.div`
  width: 600px;
`;

const ContactListItem = styled.li`
  list-style: none;
  padding: 0;
  border-bottom: 1px solid grey;

  &:hover {
    background-color: lightgrey;
  }
`;
// End of Styled Components

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const query = `
  query getContactById($contactId: Int!) {
    getContactById(contactId: $contactId) {
      ...contactFields
    }
  }

  fragment contactFields on Contact {
    contactId
    firstName
    lastName
    email
    phone
    address
  }
`;

const setVariables = index => ({
  contactId: index,
});

class ContactListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResult: this.props.allContacts, // default to show all contact on sidebar
    };
  }

  /**
   * Prepare for getting the contact details when the user directly enter URL
   * e.g. path = `/contact/4` => get the contact whose contactId === 4
   */
  componentWillMount(nextProps) {
    const id = window.location.pathname.replace('/contact/', '');
    this.getContactById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allContacts !== this.props.allContacts) {
      this.setState({ searchResult: nextProps.allContacts });
    }
    // to keep track of browser history
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.getContactById(nextProps.location.pathname.replace('/contact/', ''));
    }
  }

  // Fire on any changes to the search input field
  // Can search based on fields listed on 'keys' array
  handleKeyChange = event => {
    const { allContacts } = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 50,
      minMatchCharLength: 1,
      keys: ['firstName', 'lastName', 'phone', 'address', 'email'],
    };
    const fuse = new Fuse(allContacts, options);
    let result;
    if (event.target.value === '') {
      result = allContacts;
    } else {
      result = fuse.search(event.target.value);
    }

    this.setState({
      searchResult: result,
      searchInput: event.target.value,
    });
  };

  // to prevent resetting the form on "Enter"
  handleSubmit = event => event.preventDefault();

  getContactById = index => {
    fetch({
      query,
      variables: setVariables(index),
    })
      .then(({ data }) => {
        this.props.dispatch({
          type: 'SET_CURRENT_CONTACT',
          payload: data.getContactById,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleClick = index => {
    this.getContactById(index);
  };

  render() {
    const { searchResult } = this.state;
    const { routes } = this.props;

    return (
      <div>
        <ContactListContainer>
          <SideBar>
            <SideBarHeading>All Contacts</SideBarHeading>
            <form onSubmit={this.handleSubmit}>
              <SearchInput
                value={this.state.searchInput}
                placeholder="Search"
                onChange={this.handleKeyChange}
                type="search"
              />
            </form>
            <ul>
              {searchResult &&
                searchResult.map(contact => (
                  <ContactListItem>
                    <StyledLink
                      to={`/contact/${contact.contactId}`}
                      key={contact.contactId}
                      onClick={this.handleClick.bind(this, contact.contactId)}
                    >
                      {contact.lastName}, {contact.firstName}
                    </StyledLink>
                  </ContactListItem>
                ))}
            </ul>
          </SideBar>
          <ContactDetailsWrapper>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </ContactDetailsWrapper>
        </ContactListContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allContacts: state.addressBook.allContacts,
  routes: state.addressBook.routes,
});

export default withRouter(connect(mapStateToProps)(ContactListItems));
