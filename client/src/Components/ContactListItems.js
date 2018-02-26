import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ContactListItems = styled.ul``;

const ContactListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
`;
class ContactDetails extends PureComponent {
  handleClick = event => {};
  render() {
    const { contacts = [] } = this.props;
    return (
      <ContactListItems>
        {contacts &&
          contacts.map(contact => (
            <ContactListItem onClick={this.handleClick}>
              {contact.firstName} {contact.lastName}
            </ContactListItem>
          ))}
      </ContactListItems>
    );
  }
}

export default ContactDetails;
