import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContactEditForm from './ContactEditForm';

// Styled Components
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

const Label = styled.div`
  display: inline-block;
  font-weight: 600;
  width: 100px;
`;

const EditButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  padding: 0 1rem;
  font-size: 1rem;
  cursor: pointer;
  background: lightgrey;
`;

const ContactDetailsWrapper = styled.div`
  padding: 1rem 2rem;
  flex-grow: 5;
`;

const ContactDetailsItem = styled.div`
  padding: 0.5rem;
`;

const Header = styled.h2`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;
// End of Styled Components

class ContactDetails extends PureComponent {
  handleEditFormClick = () => {
    this.props.dispatch({ type: 'TOGGLE_EDIT_CONTACT' });
  };

  render() {
    const { contactDetails, isEditingContact, dispatch } = this.props;

    return (
      <ContactDetailsContainer>
        <MenuBar>
          <EditButton onClick={this.handleEditFormClick}>Edit</EditButton>
        </MenuBar>

        {isEditingContact ? (
          <ContactEditForm
            contactId={contactDetails.contactId}
            firstName={contactDetails.firstName}
            lastName={contactDetails.lastName}
            email={contactDetails.email}
            phone={contactDetails.phone}
            address={contactDetails.address}
            dispatch={dispatch}
          />
        ) : (
          contactDetails && (
            <ContactDetailsWrapper>
              <Header>
                {contactDetails.firstName} {contactDetails.lastName}
              </Header>
              <ContactDetailsItem>
                <Label>Phone:</Label>
                {contactDetails.phone}
              </ContactDetailsItem>
              <ContactDetailsItem>
                <Label>Email:</Label>
                {contactDetails.email}
              </ContactDetailsItem>
              <ContactDetailsItem>
                <Label>Address:</Label>
                {contactDetails.address}
              </ContactDetailsItem>
            </ContactDetailsWrapper>
          )
        )}
      </ContactDetailsContainer>
    );
  }
}

ContactDetails.propTypes = {
  contactDetails: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  isEditingContact: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contactDetails: state.addressBook.selectedContact,
  isEditingContact: state.addressBook.isEditingContact,
});

export default connect(mapStateToProps)(ContactDetails);
