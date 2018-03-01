/**
 * @jest-environment node
 */
import 'jsdom-global/register';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../src/App';
import ContactListItems from '../src/Components/ContactListItems';
import ContactEditForm from '../src/Components/ContactEditForm';
import ContactDetails from '../src/Components/ContactDetails';
import addressBookApp from '../src/reducers/';

const store = createStore(addressBookApp);

describe('Address Book Component Rendering', () => {
  it('should render <App /> without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <App dispatch={store.dispatch} />
        </Provider>,
      ).exists(<div id="app-container" />),
    ).toBe(true);
  });

  it('should render <ContactListItems /> without throwing an error', () => {
    expect(
      shallow(<ContactListItems />).exists(<div id="contatlist-container" />),
    ).toBe(true);
  });

  it('should render <ContactEditForm /> when "isEditingContact" prop is true', () => {
    expect(
      shallow(<ContactDetails store={store} />).exists(
        <div id="contact-edit-form" />,
      ),
    ).toBe(true);
  });

  it('should render <ContactDetailsWrapper /> when "isEditingContact" prop is false and there is "contactDetails"', () => {
    const mockData = {
      contactId: 1,
      firstName: 'Cameron',
      lastName: 'Dubas',
      phone: '6047280012',
      address: '289 Abbott St., Vancouver, BC, V3M 2L7',
      email: 'cameron@changeheroes.com',
    };
    expect(
      shallow(
        <ContactDetails
          store={store}
          isEditingContact={false}
          contactDetails={mockData}
        />,
      ).exists(<div id="contact-details-wrapper" />),
    ).toBe(true);
  });

  it('should render <ContactEditForm /> without throwing an error', () => {
    expect(
      shallow(
        <ContactEditForm
          firstName="john"
          lastName="doe"
          phone="12345678"
          address="123 main st"
          email="email@test.com"
          contactId={1}
          dispatch={store.dispatch}
        />,
      ).exists(<div id="contact-edit-form" />),
    ).toBe(true);
  });
  it('should render the form in <ContactEditForm /> without throwing an error', () => {
    expect(
      shallow(
        <ContactEditForm
          firstName="john"
          lastName="doe"
          phone="12345678"
          address="123 main st"
          email="email@test.com"
          contactId={1}
          dispatch={store.dispatch}
        />,
      ).exists(<div id="edit-form" />),
    ).toBe(true);
  });
});
