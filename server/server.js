const cors = require('cors');
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const mockData = require('./mockData');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        getContactById(contactId: Int!): Contact
        getContacts(firstName: String!): [Contact]
        getAllContacts: [Contact]
    },
    type Mutation {
      updateContact(contactId: Int!, firstName: String!, lastName: String!, email: String!, phone: String!, address: String!): Contact
    }
    type Contact {
        contactId: Int!
        firstName: String
        lastName: String
        email: String
        address: String
        phone: String
    }
`);

const getContactById = ({ contactId }) => {
  const result = mockData.find(contact => contact.contactId === contactId);
  return result;
};

const getContacts = ({ firstName }) => {
  const result = mockData.filter(contact => contact.firstName === firstName);
  return result;
};

const getAllContacts = () => mockData;

const updateContact = ({
  contactId,
  firstName,
  lastName,
  email,
  phone,
  address,
}) => {
  const result = mockData.find(contact => contact.contactId === contactId);
  result.firstName = firstName;
  result.lastName = lastName;
  result.phone = phone;
  result.email = email;
  result.address = address;
  return result;
};

const root = {
  getContactById,
  getContacts,
  getAllContacts,
  updateContact,
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql'),
);

module.exports = {
  mockData,
  getContacts,
  getContactById,
  getAllContacts,
};
