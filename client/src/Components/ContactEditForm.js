import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 1rem;
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
  width: 80px;
  height: 30px;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
`;

const ContactEditForm = ({ firstName, lastName, email, phone, address }) => (
  <FormContainer>
    <h1>Edit Contact</h1>
    {/*
      The benefit of the render prop approach is that you have full access to React's
      state, props, and composition model. Thus there is no need to map outer props
      to values...you can just set the initial values, and if they depend on props / state
      then--boom--you can directly access to props / state.

      The render prop accepts your inner form component, which you can define separately or inline
      totally up to you:
      - `<Formik render={props => <form>...</form>}>`
      - `<Formik component={InnerForm}>`
      - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
    */}
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        address,
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ },
      ) => {}}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="firstName">First Name</StyledLabel>
          <StyleInput
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
          <StyleInput
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          <StyledLabel htmlFor="phone">Phone</StyledLabel>
          <StyleInput
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />{' '}
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyleInput
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />{' '}
          <StyledLabel htmlFor="address">Address</StyledLabel>
          <StyleInput
            type="address"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
        </form>
      )}
    />
  </FormContainer>
);

export default ContactEditForm;
