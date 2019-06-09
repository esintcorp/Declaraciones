import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/logic/Header';
import checkMailImage from '../../assets/images/check-inbox.png';

class PaymentResult extends Component {

  render() {
    const { location } = this.props,
      paymentResult = location.state && location.state.paymentResult;
    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <div className='payment-result'>
            <div className='payment-result-img'>
              <img
                alt=''
                src={checkMailImage}
                className='payment-OK-img'
              />
            </div>

            {paymentResult ?
              <div>
                <i className="fas fa-check-circle fa-6x to-big-green"></i>
                {/*<FontAwesomeIcon className='to-big' style={{marginTop: 50}} icon={"check-circle"} size='5x' />*/}
                <p>Pago recibido con éxito</p>
                <p>Sus datos fueron enviados por correo</p>
                <div className='social'>
                  <i className="fab fa-facebook-f fa-3x social-icon"></i>
                  <i className="fab fa-whatsapp fa-3x social-icon"></i>
                  <i className="fab fa-instagram fa-3x social-icon"></i>
                  {/*<FontAwesomeIcon style={{}} icon={"facebook-f"} size='3x' />
                  <FontAwesomeIcon style={{}} icon={"whatsapp"} size='3x' />
                  <FontAwesomeIcon style={{}} icon={"instagram"} size='3x' />*/}
                </div>
              </div> :
              <div>
                <i class="fas fa-times-circle fa-6x to-big-red"></i>
                <p style={{margin: '30px 0'}} >Hubo errores con la transacción</p>
              </div>
            }
          </div>
        </section>
      </React.Fragment>
    );
  }
};

export default PaymentResult;
