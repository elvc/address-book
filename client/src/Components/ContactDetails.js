import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ContactDetailsWrapper = styled.div`
  padding: 1rem;
`;
const ContactDetailsItem = styled.div`
  padding: 0.5rem;
`;

class ContactDetails extends PureComponent {
  render() {
    const { contact = [] } = this.props;
    return (
      contact && (
        <ContactDetailsWrapper>
          <ContactDetailsItem>First Name: {contact.firstName}</ContactDetailsItem>
          <ContactDetailsItem>Last Name: {contact.lastName}</ContactDetailsItem>
          <ContactDetailsItem>Phone: {contact.phone}</ContactDetailsItem>
          <ContactDetailsItem>Email: {contact.email}</ContactDetailsItem>
          <ContactDetailsItem>Address: {contact.address}</ContactDetailsItem>
        </ContactDetailsWrapper>
      )
    );
  }
}

export default ContactDetails;
