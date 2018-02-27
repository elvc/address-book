import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ContactEditForm from './ContactEditForm';

const ContactDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const EditButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const EmptyPlaceHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 5;
`;

const ContactDetailsWrapper = styled.div`
  padding: 1rem;
  flex-grow: 5;
`;

const ContactDetailsItem = styled.div`
  padding: 0.5rem;
`;

class ContactDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditFormOpen: false,
    };
  }

  handleEditFormClick = () => {
    this.props.dispatch({ type: 'TOGGLE_EDIT_CONTACT' });
  };

  render() {
    const { contactDetails, isEditingContact } = this.props;

    return (
      <ContactDetailsContainer>
        <MenuBar>
          <EditButton onClick={this.handleEditFormClick}>Edit</EditButton>
        </MenuBar>

        {!Object.keys(contactDetails).length ? (
          <EmptyPlaceHolder>Please select a contact to start</EmptyPlaceHolder>
        ) : isEditingContact ? (
          <ContactEditForm
            contactId={contactDetails.contactId}
            firstName={contactDetails.firstName}
            lastName={contactDetails.lastName}
            email={contactDetails.email}
            phone={contactDetails.phone}
            address={contactDetails.address}
          />
        ) : (
          contactDetails && (
            <ContactDetailsWrapper>
              <ContactDetailsItem>
                First Name: {contactDetails.firstName}
              </ContactDetailsItem>
              <ContactDetailsItem>
                Last Name: {contactDetails.lastName}
              </ContactDetailsItem>
              <ContactDetailsItem>
                Phone: {contactDetails.phone}
              </ContactDetailsItem>
              <ContactDetailsItem>
                Email: {contactDetails.email}
              </ContactDetailsItem>
              <ContactDetailsItem>
                Address: {contactDetails.address}
              </ContactDetailsItem>
            </ContactDetailsWrapper>
          )
        )}
      </ContactDetailsContainer>
    );
  }
}

const mapStateToProps = state => ({
  contactDetails: state.addressBook.selectedContact,
  isEditingContact: state.addressBook.isEditingContact,
});

export default connect(mapStateToProps)(ContactDetails);
