import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Contacts/Form/Form';
import Filter from './Contacts/Filter/Filter';
import ListContacts from './Contacts/ListContacts/ListContacts';
import { Title, Container, Caption } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(5), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(5), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(5), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(5), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  onSubmit = data =>
    this.setState(prevState => {
      const contacts = prevState.contacts;
      if (contacts.find(({ name }) => name === data.name)) {
        return alert(`${data.name} is already in contacts`);
      }
      return { contacts: [data, ...contacts] };
    });
  onFilterChange = e => this.setState({ filter: e.target.value });

  removeContact = e => {
    const { contacts } = this.state;
    const idx = contacts.findIndex(
      contact => contact.id === e.target.dataset.id
    );
    contacts.splice(idx, 1);
    this.setState({ contacts: contacts });
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibilityContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <>
        <Title>Phonebook</Title>
        <Form onSubmit={this.onSubmit} />
        <Container>
          <Caption>Contacts</Caption>
          <Filter value={this.state.filter} onChange={this.onFilterChange} />
          <ListContacts
            contacts={visibilityContacts}
            onRemove={this.removeContact}
          />
        </Container>
      </>
    );
  }
}
