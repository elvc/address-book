import { combineReducers } from 'redux';
import addressBook from './addressBook';

const addressBookApp = combineReducers({
  addressBook,
});

export default addressBookApp;
