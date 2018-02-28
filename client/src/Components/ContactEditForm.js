import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { createApolloFetch } from 'apollo-fetch';

// Styled Components
const FormContainer = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const StyleInput = styled.input`
  display: block;
  width: 350px;
  height: 30px;
  color: grey;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding-left: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
`;

const EditHeader = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;
// End of Styled Components

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

class ContactEditForm extends PureComponent {
  updateContact = (
    { firstName, lastName, email, phone, address },
    contactId,
  ) => {
    fetch({
      query: `mutation
        updateContact(
          $firstName: String!,
          $lastName: String!,
          $phone: String!,
          $email: String!,
          $address: String!,
          $contactId: Int!
        ){
        updateContact(
          firstName: $firstName,
          lastName: $lastName,
          contactId: $contactId,
          phone: $phone,
          email: $email,
          address: $address
        ) {
          firstName
          lastName
          email
          address
          phone
          contactId
        }
      }`,
      variables: {
        firstName,
        lastName,
        email,
        phone,
        address,
        contactId,
      },
    })
      .then(res => {
        const updatedContact = res.data.updateContact;

        this.props.dispatch({
          type: 'UPDATE_CONTACT',
          payload: updatedContact,
        });
        this.props.dispatch({
          type: 'SET_CURRENT_CONTACT',
          payload: updatedContact,
        });
        this.props.dispatch({ type: 'TOGGLE_EDIT_CONTACT' });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      contactId,
    } = this.props;
    return (
      <FormContainer>
        <EditHeader>Edit Contact</EditHeader>
        <Formik
          initialValues={{
            firstName,
            lastName,
            email,
            phone,
            address,
          }}
          onSubmit={values => this.updateContact(values, contactId)}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <StyledLabel htmlFor="firstName">First Name</StyledLabel>
              <StyleInput
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
              <StyleInput
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <StyledLabel htmlFor="phone">Phone</StyledLabel>
              <StyleInput
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />{' '}
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyleInput
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />{' '}
              <StyledLabel htmlFor="address">Address</StyledLabel>
              <StyleInput
                type="address"
                name="address"
                id="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                Submit
              </SubmitButton>
            </Form>
          )}
        />
      </FormContainer>
    );
  }
}

ContactEditForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contactId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ContactEditForm;
