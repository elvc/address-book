import React, { PureComponent } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import styled from 'styled-components';

const ContactListItems = styled.ul``;

const ContactListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
`;

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

// const query = `
//   query getContacts($firstName: String!) {
//     getContacts(firstName: $firstName) {
//       ...contactFields
//     }
//   }

//   fragment contactFields on Contact {
//     contactId
//     firstName
//     lastName
//     email
//     phone
//     address
//   }
// `;

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
  //To-Do
  // getContactByName = name => {
  //   var splits = name.split(' ', 1);
  //   fetch({
  //     query,
  //     variables,
  //   }).then(res => {
  //     console.log('res.data', res.data);
  //   });
  // };

  getContactById = index => {
    fetch({
      query,
      variables: setVariables(index),
    }).then(res => {
      console.log('res', res);
    });
  };

  handleClick = index => {
    // this.getContactByName(event.target.innerText);
    console.log('clicked index', index);
    this.getContactById(index);
  };

  render() {
    const { contacts = [] } = this.props;
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

export default ContactDetails;
