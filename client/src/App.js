import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import logo from './logo.svg';
import './App.css';

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  getAllContacts = () => {
    fetch({
      query: `{contacts {
      contactId
      firstName
      lastName
      email
      address
      phone
    }}`,
    }).then(res => {
      this.setState({
        contacts: res.data.contacts,
      });
    });
  };

  //To-Do
  getContactbyId = id => {
    fetch({
      query: `query Contact($id: Int!) {
        contact(contactId: $id) {
          firstName
        }`,
      variables: { id },
    }).then(res => {
      this.setState({
        contacts: res.data.contacts,
      });
    });
  };
  componentDidMount() {
    this.getAllContacts();
    // this.getContactbyId(1);
    // You can also easily pass variables for dynamic arguments
    // fetch({
    //   query: `query PostsForAuthor($id: Int!) {
    //     author(id: $id) {
    //       firstName
    //       posts {
    //         title
    //         votes
    //       }
    //     }
    //   }`,
    //   variables: { id: 1 },
    // }).then(res => {
    //   console.log(res.data);
    // });
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Address Book</h1>
        </header>
        <div className="App-intro">
          <div>GraphQL port: 4000</div>
          <div>First Name: {this.state.firstName}</div>
          <div>Last Name: {this.state.lastName}</div>
          <div>Email: {this.state.email}</div>
          <div>Phone: {this.state.phone}</div>
        </div>
      </div>
    );
  }
}

export default App;
