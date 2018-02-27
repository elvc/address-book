import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createApolloFetch } from 'apollo-fetch';
import styled from 'styled-components';

const ContactListItems = styled.ul``;

const ContactListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  cursor: pointer;

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

class ContactDetails extends PureComponent {
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
    const { contacts } = this.props;

    return (
      <ContactListItems>
        {contacts &&
          contacts.map(contact => (
            <ContactListItem
              key={contact.contactId}
              onClick={this.handleClick.bind(this, contact.contactId)}
            >
              {contact.firstName} {contact.lastName}
            </ContactListItem>
          ))}
      </ContactListItems>
    );
  }
}

const mapStateToProps = state => ({ contacts: state.addressBook.allContact });

export default connect(mapStateToProps)(ContactDetails);
