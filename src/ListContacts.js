import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState((state) => ({
      query: query.trim(),
    }));
  };

  render() {
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search Contacts"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        {JSON.stringify(this.state)}
        <ol className="contact-list">
          {this.props.contacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>@{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => {
                  this.props.onDeleteContact(contact.id);
                }}
              >
                remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
