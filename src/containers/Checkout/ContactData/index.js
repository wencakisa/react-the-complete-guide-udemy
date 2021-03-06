import React, { Component } from 'react';

import { Button } from '../../../components/shared';

import styles from './styles.module.css';

class ContactData extends Component {
  state = {
    username: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  render() {
    return (
      <div className={styles.contactData}>
        <h4>Enter your contact data:</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal code" />
          <Button type="success" onClick={() => {}}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
