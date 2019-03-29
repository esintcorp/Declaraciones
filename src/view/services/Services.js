import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconCheckbox from '../../components/form/FormIconCheckbox';
import FormIconRadio from '../../components/form/FormIconRadio';
import Title from '../../components/title/Title';
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
    const { history, location } = this.props,
      dataPeriod = location.state && location.state.dataPeriod,
      user = location.state && location.state.user;
console.info('this.props:', this.props)
    let periodSelected, descrp, costSelected, periodNameSelected;
    if (dataPeriod) {
      periodSelected = dataPeriod.find(p => p.code === this.state.period);
      descrp = periodSelected && periodSelected.description;
      costSelected = periodSelected && periodSelected.cost;
      periodNameSelected = periodSelected && periodSelected.period;
    } else {
      // history.push('/register')

    }

    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <Form
            style={{flex: 1}}
            endpoint="subscription"
            body={{period: {code: this.state.period}, user, status: 'active'}}
            validationSchema={yupObject().shape({
              // type: yupObject().required("Seleccione al menos un Tipo"),
              period: yupString().required("Seleccione un período")
            })}
            submitButtonStyle={{width: '20vmin'}}
            onSuccess={data => {
              console.info('data', data)
              history.push({
                pathname: "/terms",
                state: {
                  subscription: data
                }
              });
            }}
            submitButton
          >
            <Title>Seleccione los servicios</Title>
            <div className="subscription-type-div">
              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="iva"
                value={true}
                leftLabel="IVA"
                onChange={this.handleCheckChange}
                iconName="university"
              />

              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="renta"
                value={true}
                leftLabel="Impuesto a la renta"
                onChange={this.handleCheckChange}
                iconName="university"
              />

              <FormIconCheckbox
                style={{border: "none", margin: '0 20px'}}
                name="anexos"
                value={true}
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
