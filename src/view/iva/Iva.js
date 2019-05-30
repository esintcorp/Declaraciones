import React, { Component } from 'react'

import FormIconButton from '../../components/form/FormIconButton';
import FormIconInput from '../../components/form/FormIconInput';
import { doFetch } from '../../utility/Util';

import IvaForm from "./IvaForm"

const IvaList = props => {
console.info('props', props)
  return(
    props.data ? props.data.filter(item => item.billType.id === props.filter).map(item => {
      return (
        <div className="iva-title-buy" key={item.id}>{item.name}</div>
      )
    }) : null
)}

class Iva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      BillResume: {},
      IvaQuestions: null,
      IvaAnswers: null,
      showPopup: false
    };
    // this.getIvaQuestions = this.getIvaQuestions.bind(this);
    this.getIvaAnswers = this.getIvaAnswers.bind(this);
    this.newIvaAnswer = this.newIvaAnswer.bind(this);
    this.newBuy = this.newBuy.bind(this);
    this.newSell = this.newSell.bind(this);
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

  newIvaAnswer() {
    if (!this.state.showPopup) {
      this.setState({showPopup: true})
    }
  }

  newBuy() {
    let newIvaAnswer = []

    this.state.IvaQuestions.filter(item => item.billType.id === 1).map(field => {
      // newIvaAnswer[field.name] = null
      newIvaAnswer.push({
        id: field.id,
        name: field.name,
        type: field.datatype,
        value: '',
        billType_id: 1
      })
      return null
    })

    this.setState({
      newIvaAnswer,
      showPopup: false
    })
  }

  newSell() {
    let newIvaAnswer = {}

    this.state.IvaQuestions.filter(item => item.billType.id === 2).map(field => {
      newIvaAnswer[field.name] = null
      return null
    })
    this.setState({
      newIvaAnswer: {
        billType: {
          id: 2
        },
        ...newIvaAnswer
      },
      showPopup: false
    })
  }

  render() {
    const { BillResume, IvaQuestions, IvaAnswers, showPopup, newIvaAnswer } = this.state;

    let popupClass = showPopup ? "iva-popup" : "iva-popup hidden-div"

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
        <button
          className="App-button"
          onClick={this.newIvaAnswer}
        >
          <i className='fas fa-plus fa-1x'></i>
        </button>
      </div>
      <div className={popupClass}>
      {/*<div className="ppppppp">*/}
        <button
          className="App-button iva-new-button"
          onClick={this.newBuy}
        >
          Compra
        </button>
        <button
          className="App-button iva-new-button"
          onClick={this.newSell}
        >
          Venta
        </button>
      {/*</div>*/}
      </div>
      <div className="iva-list">
      {console.info('IvaAnswers', IvaAnswers, newIvaAnswer )}
        {IvaAnswers && IvaAnswers.length > 0 && <div className="iva-list">
          {IvaAnswers.filter(item => item.billType.id === 1).length >1 && <div className="iva-list-buy">
            <IvaList
              data={IvaQuestions}
              filter={1}
            />
          </div>}
          <div className="iva-list-sell">
            <IvaList
              data={IvaQuestions}
              filter={2}
            />
          </div>
        </div>}
        {IvaAnswers && IvaAnswers.length === 0 && <div className="iva-list">
          NO DATA
        </div>}
        {newIvaAnswer && newIvaAnswer[0].billType_id === 1 && <IvaForm
          data={IvaQuestions}
          filter={1}
          newIvaAnswer={this.state.newIvaAnswer}
        />}
        {newIvaAnswer && newIvaAnswer[0].billType_id === 2 && <div className="iva-list-sell">
          <IvaForm
            data={IvaQuestions}
            filter={2}
            newIvaAnswer={this.state.newIvaAnswer}
          />
        </div>}
      </div>
      <div className="resume">
        <div>
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
