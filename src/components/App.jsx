import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm.jsx/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from '../GlobalStyle';
import { useLocalStorage } from 'hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`Contact ${contact.name} is already exists!`);
      return false;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });

    return true;
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(({ id }) => id !== contactId);
    });
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().trim().includes(filter.toLowerCase())
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <h1 style={{ fontSize: '32px' }}>Phone book</h1>
        <ContactForm addContact={addContact} />

        <h2 style={{ fontSize: '32px' }}>Contacts</h2>

        {contacts.length !== 0 ? (
          <>
            <Filter onFilterChange={handleFilter} value={filter} />
            <ContactList
              contacts={filteredContacts()}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <p>You haven't any contacts</p>
        )}
      </div>
      <GlobalStyle />
    </div>
  );
}
