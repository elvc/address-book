import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import { createApolloFetch } from 'apollo-fetch';
import styled from 'styled-components';

const SearchInput = styled.input`
  -webkit-appearance: none;
  display: block;
  width: 200px;
  height: 30px;
  color: grey;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding-left: 0.5rem;
`;

const ContactListItems = styled.ul``;

const ContactListItem = styled.li`
  list-style: none;
  padding: 1rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid grey;

  &:hover {
    background-color: lightgrey;
  }
`;

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

class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResult: this.props.allContacts,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allContacts !== this.props.allContacts) {
      this.setState({ searchResult: nextProps.allContacts });
    }
  }

  // Fire on any changes to the search input field. Also perform search here
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

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <SearchInput
            value={this.state.searchInput}
            placeholder="Search"
            onChange={this.handleKeyChange}
            type="search"
          />
        </form>
        <ContactListItems>
          {searchResult &&
            searchResult.map(contact => (
              <ContactListItem
                key={contact.contactId}
                onClick={this.handleClick.bind(this, contact.contactId)}
              >
                {contact.firstName} {contact.lastName}
              </ContactListItem>
            ))}
        </ContactListItems>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  allContacts: state.addressBook.allContacts,
});

export default connect(mapStateToProps)(ContactDetails);
