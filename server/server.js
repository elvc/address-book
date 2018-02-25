const cors = require('cors');
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// mock data
const contactsData = [
  {
    contactId: 1,
    firstName: 'Cameron',
    lastName: 'Dubas',
    phone: '6047280012',
    address: '289 Abbott St., Vancouver, BC, V3M 2L7',
    email: 'cameron@changeheroes.com',
  },
  {
    contactId: 2,
    firstName: 'Mike',
    lastName: 'Tan',
    phone: '6043421109',
    address: '102 Homer St., Vancouver, BC, V2K 3G7',
    email: 'mike@changeheroes.com',
  },
  {
    contactId: 3,
    firstName: 'Ryan',
    lastName: 'Campbell',
    phone: '6049881822',
    address: '1807 Granville St, Vancouver, BC, V7G 2F9',
    email: 'ryan@changeheroes.com',
  },
  {
    contactId: 4,
    firstName: 'Ryan',
    lastName: 'Kamp',
    phone: '6049884422',
    address: '100 Granville St, Vancouver, BC, V7G 2F9',
    email: 'ryank@changeheroes.com',
  },
];

// GraphQL schema
const schema = buildSchema(`
    type Query {
        contact(contactId: Int!): Contact
        getAllContacts: [Contact]
    },
    type Mutation {
      addNewContact(firstName: String!, lastName: String!, email: String, phone: String, address: String): Contact
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

const getContact = args =>
  contactsData.filter(contact => contact.firstName === args.firstName);

const getAllContacts = () => contactsData;

const addNewContact = ({ firstName, lastName, email, phone, address }) => {
  contactsData.push({
    contactId: contactsData.length + 1,
    firstName,
    lastName,
    phone,
    email,
    address,
  });
  return contactsData[contactsData.length - 1];
};

const root = {
  contact: getContact,
  getAllContacts: getAllContacts,
  addNewContact: addNewContact,
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
