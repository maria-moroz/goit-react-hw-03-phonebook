import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import s from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  handleFormSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();

    onSubmit({ id: nanoid(), ...this.state });

    this.reset();
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const nameId = nanoid();
    const numberId = nanoid();

    const { name, number } = this.state;

    return (
      <form className={s.container} onSubmit={this.handleFormSubmit}>
        <div className={s.fieldContainer}>
          <label htmlFor={nameId} className={s.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id={nameId}
            className={s.input}
            value={name}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={s.fieldContainer}>
          <label htmlFor={numberId} className={s.label}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            id={numberId}
            className={s.input}
            value={number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" className={s.submitButton}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
