import React, { Component } from 'react';
import { date as yupDate, object as yupObject, string as yupString } from "yup";

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconInput from '../../components/form/FormIconInput';
import Title from '../../components/title/Title';
import Form from '../../components/form/Form';
import cardImage from '../../assets/images/card.png';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: {
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;

    this.setState({
      payment: {
        ...this.state.payment,
        [name]: value
      }
    });
    console.info(this.state)
  }

  render() {
    const { history, location } = this.props,
      inputStyle = {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        border: 'none'
      },
      subscription = location.state.subscription;

    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <Form
            style={{flex: 0.7}}
            endpoint="payment"
            body={{...this.state.payment, status: 'active', user: subscription.user}}
            validationSchema={yupObject().shape({
              cardName: yupString().required("Ingrese el nombre de su tarjeta"),
              cardNumber: yupString().required("Ingrese el número de su tarjeta"),
              expirationDate: yupDate().required("Ingrese la fecha en que expira su tarjeta"),
              cvv: yupString().required("Ingrese el código CVV o CVC de su tarjeta"),
            })}
            submitButtonStyle={{width: '20vmin'}}
            onSuccess={data => {
              history.push({
                pathname: '/payment-result',
                state: {
                  paymentResult: data
                }
              });
            }}
            submitButton
          >
            <Title>Realice su pago</Title>

            <div className="payment-div">
              <img
                alt=''
                src={cardImage}
                className='payment-card'
              />
              <div className='payment-data'>
                <FormIconInput
                  label='Nombre de la tarjeta'
                  style={{...inputStyle, marginTop: 0}}
                  name='cardName'
                  placeholder='Javier Salazar'
                  value={this.state.payment.cardName}
                  onChange={this.handleChange}
                  classNames='payment-input'
                />
                <FormIconInput
                  label='Número de la tarjeta'
                  style={inputStyle}
                  name="cardNumber"
                  placeholder="1234-5678-xxxxxx"
                  value={this.state.payment.cardNumber}
                  onChange={this.handleChange}
                  classNames='payment-input'
                />
                <FormIconInput
                  label='Fecha de expiración'
                  style={inputStyle}
                  name="expirationDate"
                  type="date"
                  // placeholder="MM/YY"
                  value={this.state.payment.expirationDate}
                  onChange={this.handleChange}
                  classNames={['payment-input', 'input-width-88']}
                />
                <FormIconInput
                  label='CVC / CVV'
                  style={inputStyle}
                  name="cvv"
                  placeholder="1234"
                  value={this.state.payment.cvv}
                  onChange={this.handleChange}
                  classNames='payment-input'
                />
              </div>
            </div>
          </Form>
        </section>
      </React.Fragment>
    );
  }
}

export default Payment;
