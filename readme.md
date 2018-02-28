# Address Book Application

## Tech stack used:

### Front-end

* React
* Redux
* Styled-Components

### Back-end

* NodeJS, Express
* GraphQL
* Apollo-fetch

## Installation

You need to start both client and server:

```
cd client
yarn && yarn start
```

```
cd server
yarn && yarn start
```

## Functionalities:

1. All mock contacts are listed on the left-hand side and searchable by either first name, last name, phone, email, or address. It will show all matching contacts as you type. No need to press enter
2. Contacts can be selected and toggled to view their full details in the main view.
3. Contacts should be editable in the main view.
4. Contacts can be navigated directly to a contact based on Contact ID. For example, `localhost:3000/contact/2` will show the contact details of the second contact
5. `localhost:3000` is your home page. You need to select a contact to begin using
