import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { getAll, remove } from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: [],
    screen: "list",
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
    const { screen } = this.state;
    return (
      <div>
        {screen === "list" && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.onDeleteContact}
            onNavigate={() =>
              this.setState((state) => ({
                screen: "create",
              }))
            }
          />
        )}
        {screen === "create" && <CreateContact />}
      </div>
    );
  }
}

export default App;
