import React, { Component } from 'react'

import FormIconButton from '../../components/form/FormIconButton';
import FormIconInput from '../../components/form/FormIconInput';
import { getToken } from '../../components/logic/Authentication';

class Iva extends Component {

  constructor(props) {
    super(props);

    this.state = {
      BillResume: {}
    };
  }

  componentDidMount() {
    fetch('http://localhost:8050/getIvaTotals', {
      method: "POST",
      mode: 'cors',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': contentType
        'X-CSRF-TOKEN': getToken()
      },
      credentials: 'include'
    }).then(response => {
      console.info('response', response)
      response.json().then(data => {
        if (!response.ok || response.status !== 200) {
          console.info('getIvaTotals NOT OK', data)

          // if (!offlinePathnamesList.find(pathname => pathname === window.location.pathname)) {
          //   console.info( 'path not found' )
          //   window.location.assign('http://localhost:3000')
          // }

        } else {
          console.info('getIvaTotals OK', data)
          this.setState({ BillResume: data });
          // if (!onlinePathnamesList.find(pathname => pathname === window.location.pathname)) {
          //   console.info( 'path not found' )
          //   window.location.assign('http://localhost:3000')
          // }
          // console.info("object", data)
          // sessionStorage.setItem('user', JSON.stringify(data))
          // this.setState({ sessionInfo: data });
        }
      }).catch(errors => {
        console.error(errors)
      });
      // if (response && response.ok) {
        // localStorage.setItem("csrfToken", undefined);
        // afterLogout();
        // console.info(getToken())
      // }
    }).catch(errorfetch => {
      console.error(errorfetch)
    });
  }

  render() {
    const BillResume = this.state.BillResume

    return <React.Fragment>
      <div className="buttons-menu">
        {/*<button className="App-button">
          <i className="fas fa-list fa-2x"></i>
        </button> */}
        <FormIconButton
          // style={{minWidth: '5vmin', margin: '0 0 0 15px', padding: 5, flex: 0}}
          iconName="list"
          // iconSize="2x"
          onClick={this.profileFunction}
        />
        <button className="App-button">
          <i className='fas fa-plus fa-1x'></i>
        </button>
      </div>
      <div className="resume">
        <div className="iva-resume">
          <div className="iva-resume-item">
            <div>Total Ventas:</div>
            <div className="iva-resume-item-value">
              {new Intl.NumberFormat('es-EC', {
                  style: 'currency',
                  currency: 'USD',
                  // minimumFractionDigits: 0,
                  // maximumFractionDigits: 0
              }).format(BillResume.sellTotal)}
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
              }).format(BillResume.buyTotal)}
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
              }).format(BillResume.paymentTotal)}
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
