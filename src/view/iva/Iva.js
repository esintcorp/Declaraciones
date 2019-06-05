import React, { Component } from 'react'

import FormIconButton from '../../components/form/FormIconButton';
import { doFetch } from '../../utility/Util';

import IvaForm from "./IvaForm"

const IvaList = ({ titles, data, filter }) => {

  return titles
    ? titles
        .filter(item => item.billType.id === filter)
        .map(item => {
          return (
            <div key={item.id}>
              <div className="iva-title">
                {item.name}
              </div>
              <div className="iva-answer" >
                {data.filter(dataItem => dataItem.id === item.id)
                  .map(dataItem => {
                    // let cellClassName = "iva-answer-cell";
                    //
                    // if (dataItem.type === "double") {
                    //   cellClassName = cellClassName + " cell-number"
                    // }
                    let itemValue = dataItem.value;
                    if (dataItem.type === "double") {
                      itemValue = new Intl.NumberFormat('es-EC', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(dataItem.value || 0)
                    } else if (dataItem.type === "date") {
                      itemValue = new Intl.DateTimeFormat('es', {
                        // weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }).format(new Date((dataItem.value + "T00:00:00") || 0))
                    }
                    return(
                      <div className="iva-answer-cell" key={dataItem.billId+dataItem.id}>
                        {itemValue}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          );
        })
    : null;
};

class Iva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      BillResume: {},
      IvaQuestions: null,
      IvaAnswers: null,
      showPopup: false,
      recentBill: null
    };
    // this.getIvaQuestions = this.getIvaQuestions.bind(this);
    this.getIvaAnswers = this.getIvaAnswers.bind(this);
    this.newIvaAnswer = this.newIvaAnswer.bind(this);
    this.showPopupButtons = this.showPopupButtons.bind(this);
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
        this.setState({
          IvaAnswers: data,
          newIvaAnswer: null,
          showPopup: false
        });
      }
    })
  }

  showPopupButtons() {
    this.setState({showPopup: !this.state.showPopup})
  }

  newIvaAnswer(filter) {
    let newIvaAnswer = []

    this.state.IvaQuestions.filter(
      item => item.billType.id === filter
    ).map(
      field => {
        newIvaAnswer.push({
          id: field.id,
          name: field.name,
          type: field.datatype,
          value: '',
          billType_id: filter
        })
        return null
      }
    )

    this.setState({
      newIvaAnswer,
      showPopup: false,
      IvaAnswers: null
    })
  }

  render() {
    const { BillResume, IvaQuestions, IvaAnswers, showPopup, newIvaAnswer } = this.state,
      { history } = this.props;

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
          onClick={this.showPopupButtons}
        >
          <i className='fas fa-plus fa-1x'></i>
        </button>
      </div>
      <div className={popupClass}>
      {/*<div className="ppppppp">*/}
        <button
          className="App-button iva-new-button"
          onClick={() => this.newIvaAnswer(1)}
        >
          Compra
        </button>
        <button
          className="App-button iva-new-button"
          onClick={() => this.newIvaAnswer(2)}
        >
          Venta
        </button>
      {/*</div>*/}
      </div>
      <div className="iva-">
      {console.info('IvaAnswers', IvaAnswers, newIvaAnswer )}
        {IvaAnswers && IvaAnswers.length > 0 && <div className="iva-list">
          <div className="iva-list-buy">
            <IvaList
              titles={IvaQuestions}
              filter={1}
              data={IvaAnswers}
            />
          </div>
          <div className="iva-list-sell">
            <IvaList
              titles={IvaQuestions}
              filter={2}
              data={IvaAnswers}
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
          history={history}
        />}
        {newIvaAnswer && newIvaAnswer[0].billType_id === 2 && <IvaForm
          data={IvaQuestions}
          filter={2}
          newIvaAnswer={this.state.newIvaAnswer}
          history={history}
        />}
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
