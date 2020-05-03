import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { getAll, remove } from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    getAll().then((contacts) => {
      this.setState((state) => ({
        contacts,
      }));
    });
  }

  onDeleteContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contacsItem) => {
        return contacsItem.id !== contact.id;
      }),
    }));

    remove(contact);
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.onDeleteContact}
            />
          )}
        />

        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
