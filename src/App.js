import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { getAll, remove, create } from "./utils/ContactsAPI";
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

  onCreateContact = (contact) => {
    create(contact).then(
      this.setState((state) => ({
        contacts: [...state.contacts, contact],
      }))
    );
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

        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.onCreateContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
