import React, { Component } from 'react'

import FormIconButton from '../../components/form/FormIconButton';
// import FormIconInput from '../../components/form/FormIconInput';
import { doFetch } from '../../utility/Util';

const IvaList = props => {
console.info('props', props)
  return(
    props.data ? props.data.filter(item => item.billType.id === props.filter).map(item => {
      return (
        <div key={item.id}>{item.name}</div>
      )
    }) : null
)}

class Iva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      BillResume: {},
      IvaQuestions: null,
      IvaAnswers: [],
    };
    // this.getIvaQuestions = this.getIvaQuestions.bind(this);
    this.getIvaAnswers = this.getIvaAnswers.bind(this);
  }

  componentDidMount() {
    doFetch({
      endpoint: "getIvaTotals",
      onOK: data => {
        this.setState({ BillResume: data });
      }
    })

    doFetch({
      endpoint: "getIvaQuestions",
      onOK: data2 => {
        this.setState({ IvaQuestions: data2 });
      }
    })
  }

  getIvaAnswers() {
    doFetch({
      endpoint: "getIvaAnswers",
      onOK: data => {
        this.setState({ IvaAnswers: data });
      }
    })
  }

  render() {
    const BillResume = this.state.BillResume,
      IvaQuestions = this.state.IvaQuestions;

    return <React.Fragment>
      <div className="buttons-menu">
        {/*<button className="App-button">
          <i className="fas fa-list fa-2x"></i>
        </button> */}
        <FormIconButton
          // style={{minWidth: '5vmin', margin: '0 0 0 15px', padding: 5, flex: 0}}
          iconName="list"
          // iconSize="2x"
          onClick={this.getIvaAnswers}
        />
        <button className="App-button">
          <i className='fas fa-plus fa-1x'></i>
        </button>
      </div>
      <div className="resume">
        <div className="iva-list">
          <div className="iva-list-buy">
            <IvaList
              data={IvaQuestions}
              filter={1}
            />
          </div>
          <div className="iva-list-sell">
            <IvaList
              data={IvaQuestions}
              filter={2}
            />
          </div>
        </div>
        <div className="iva-div">
          <div className="iva-resume-item">
            <div>Total Ventas:</div>
            <div className="iva-resume-item-value">
              {new Intl.NumberFormat('es-EC', {
                  style: 'currency',
                  currency: 'USD',
                  // minimumFractionDigits: 0,
                  // maximumFractionDigits: 0
              }).format(BillResume.sellTotal || 0)}
            </div>
          </div>
          <div className="iva-resume-item">
            <div>Total Compras:</div>
            <div className="iva-resume-item-value">
              {new Intl.NumberFormat('es-EC', {
                  style: 'currency',
                  currency: 'USD',
                  // minimumFractionDigits: 0,
                  // maximumFractionDigits: 0
              }).format(BillResume.buyTotal || 0)}
            </div>
          </div>
          <div className="iva-resume-item">
            <div>Neto a Pagar:</div>
            <div className="iva-resume-item-value">
              {new Intl.NumberFormat('es-EC', {
                  style: 'currency',
                  currency: 'USD',
                  // minimumFractionDigits: 0,
                  // maximumFractionDigits: 0
              }).format(BillResume.paymentTotal || 0)}
            </div>
          </div>
        </div>
      </div>
      {/* <p>Fecha</p>
      <FormIconInput
        // name="userId"
        // type="email"
        // placeholder="Correo Electrónico"
        // value={this.state.user.userId}
        // onChange={this.handleChange}
        // iconName="envelope"
        classNames={["flex1", "quest"]}
        style={{marginTop: 0}}
      />
      <p>RUC Proveedor</p>
      <FormIconInput
        // name="userId"
        // type="email"
        // placeholder="Correo Electrónico"
        // value={this.state.user.userId}
        // onChange={this.handleChange}
        // iconName="envelope"
        classNames={["flex1", "quest"]}
        style={{marginTop: 0, marginBottom: 40}}
      />

      <p>Nombre</p>
      <FormIconInput
        // name="userId"
        // type="email"
        // placeholder="Correo Electrónico"
        // value={this.state.user.userId}
        // onChange={this.handleChange}
        // iconName="envelope"
        classNames={["flex1", "quest"]}
        style={{marginTop: 0}}
      />

      <p>Factura</p>
      <FormIconInput
        // name="userId"
        // type="email"
        // placeholder="Correo Electrónico"
        // value={this.state.user.userId}
        // onChange={this.handleChange}
        // iconName="envelope"
        classNames={["flex1", "quest"]}
        style={{marginTop: 0}}
      />

      <p>Concepto</p>

      <p>Descripción</p>

      <FormIconButton
        style={{width: '23vmin'}}
        iconName="clipboard-check"
        onClick={this.handleSubmit}
        iconSize="2x"
      /> */}
    </React.Fragment>;
  }
}

export default Iva;
