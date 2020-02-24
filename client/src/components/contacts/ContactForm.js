import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  // now deconstruct these values out of contact:
  const { name, email, phone, type } = contact;

  const onSubmit = e => {
    e.preventDefault();
    contactContext.addContact(contact); // contact is our state which is all the form fields
    setContact({
      // back to default
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='business'
        checked={type === 'business'}
        onChange={onChange}
      />{' '}
      Business{' '}
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
