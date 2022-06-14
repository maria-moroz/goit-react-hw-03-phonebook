import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Component } from 'react';

const KEY_CONTACTS = 'contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(KEY_CONTACTS));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(KEY_CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;

    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  handleDelete = deleteId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  handleFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={contact => this.addContact(contact)} />

        <h2>Contacts</h2>
        <Filter handleFilterChange={this.handleFilterChange} filter={filter} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
