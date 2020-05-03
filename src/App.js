import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { getAll, remove } from "./utils/ContactsAPI";

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
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
