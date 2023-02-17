import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledForm } from './ContactForm.styled';
import { Button } from 'components/Button/Button';
import { Input } from '../Input/Input';

export function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isSuccess = addContact({ name: name.trim(), number });
    if (!isSuccess) return;

    setName('');
    setNumber('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        <p style={{ fontSize: '32px' }}>Name:</p>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </label>
      <label>
        <p style={{ fontSize: '32px' }}>Number:</p>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <Button type="submit">Add contact</Button>
    </StyledForm>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
