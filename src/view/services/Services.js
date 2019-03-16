import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconCheckbox from '../../components/form/FormIconCheckbox';
import FormIconRadio from '../../components/form/FormIconRadio';
import Form from '../../components/form/Form';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: {
        iva: true,
        renta: true,
        anexos: true
      },
      period: ""
    };

    this.period = [
      {
        code: 'tri',
        description: 'Comprando esta suscripción tienes derecho a realizar 3 declaraciones de IVA 1 Impuesto a la Renta y 1 Anexo de Gastos Personales',
        period: 'Trimestral',
        cost: 50
      },
      {
        code: 'sem',
        description: 'Comprando esta suscripción tienes derecho a realizar 6 declaraciones de IVA 1 Impuesto a la Renta y 1 Anexo de Gastos Personales',
        period: 'Semestral',
        cost: 80
      },
      {
        code: 'anu',
        description: 'Comprando esta suscripción tienes derecho a realizar 12 declaraciones de IVA 1 Impuesto a la Renta y 1 Anexo de Gastos Personales',
        period: 'Anual',
        cost: 120
      }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;

    this.setState({[name]: value})
    console.info(this.state)
  }

  handleCheckChange(event) {
    let name = event.target.name,
      checked = event.target.checked;
console.info("hola", name, checked)
    this.setState( prevState => ({
      type: {
        ...prevState.type,
        [name]: checked
      }
    }))
  }

  render() {
    const { history } = this.props;

    let periodSelected = this.period.find(p => p.code === this.state.period),
      descrp = periodSelected && periodSelected.description,
      costSelected = periodSelected && periodSelected.cost,
      periodNameSelected = periodSelected && periodSelected.period;

    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <Form
            style={{flex: 1}}
            endpoint="subscription"
            contentType="application/json"
            body={this.state}
            // validationSchema={yupObject().shape({
            //   userId: yupString().required("Correo Electrónico es un campo requerido")
            //     .email("Correo Electrónico debe ser válido"),
            //   password: yupString().required("Contraseña es un campo requerido")
            // })}
            submitButtonStyle={{width: '20vmin'}}
            onSuccess={() => {
              history.push("/services");
            }}
            submitButton
          >
            <div className="subscription-type-div">
              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="iva"
                value={this.state.type.iva || false}
                leftLabel="IVA"
                onChange={this.handleCheckChange}
                iconName="university"
              />

              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="renta"
                value={this.state.type.renta || false}
                leftLabel="Impuesto a la renta"
                onChange={this.handleCheckChange}
                iconName="university"
              />

              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="anexos"
                value={this.state.type.anexos || false}
                leftLabel="Anexos de gastos personales"
                onChange={this.handleCheckChange}
                iconName="university"
              />
            </div>

            <div className="subscription-period-div">
              <FormIconRadio
                style={{border: "none", margin: '0 20px'}}
                name="period"
                checked={this.state.period === "tri"}
                value="tri"
                leftLabel="Trimestral"
                onChange={this.handleChange}
              />

              <FormIconRadio
                style={{border: "none", margin: '0 20px'}}
                name="period"
                checked={this.state.period === "sem"}
                value="sem"
                leftLabel="Semestral"
                onChange={this.handleChange}
              />

              <FormIconRadio
                style={{border: "none", margin: '0 20px'}}
                name="period"
                checked={this.state.period === "anu"}
                value="anu"
                leftLabel="Anual"
                onChange={this.handleChange}
              />

            </div>
            {
              periodSelected &&
              <div className="subscription-selected">
                <div className="subscription-selected-banner">
                  <div className="cost-selected">{costSelected}</div>
                  <div className="period-selected">{periodNameSelected}</div>
                </div>
                <div className="description-selected">{descrp}</div>
              </div>
            }

          </Form>

        </section>
      </React.Fragment>
    );
  }
}

export default Services;
