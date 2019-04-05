import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/logic/Header';

class PaymentResult extends Component {

  render() {
    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <div className='payment-result'>
            <div className='payment-result-img'>
            </div>
            <FontAwesomeIcon style={{marginTop: 50}} icon={"check-circle"} size='5x' />
            <p style={{margin: '30px 0'}} >Pago recibido con éxito</p>
            <p style={{}} >Sus datos fueron enviados por correo</p>
            <div className='social'>
            <i class="fab fa-facebook-f fa-3x"></i>
            <i class="fab fa-whatsapp fa-3x"></i>
            <i class="fab fa-instagram fa-3x"></i>
            {/*<FontAwesomeIcon style={{}} icon={"facebook-f"} size='3x' />
            <FontAwesomeIcon style={{}} icon={"whatsapp"} size='3x' />
            <FontAwesomeIcon style={{}} icon={"instagram"} size='3x' />*/}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
};

export default PaymentResult;
