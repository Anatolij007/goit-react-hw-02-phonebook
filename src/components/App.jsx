import { Component } from 'react';
import { nanoid } from 'nanoid';
import { SubmitForm } from './SubmitForm/SubmitForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Container, Section } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalisedName = name.toLowerCase();

    this.setState(({ contacts }) =>
      contacts.find(contact => contact.name.toLowerCase() === normalisedName)
        ? alert(`${name} is already in contacts`)
        : { contacts: [contact, ...contacts] }
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => this.setState({ filter: e.currentTarget.value });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section>
          <h1>Phonebook</h1>
          <SubmitForm onSubmit={this.addContact} />
        </Section>
        <Section>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <Contacts
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}

// style={{
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: 40,
//   color: '#010101',
// }}
