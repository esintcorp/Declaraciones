import React, { Component } from "react";
import { doFetch } from "../../utility/Util";

class Anexo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // BillResume: {},
      AnexoQuestions: null,
      AnexoAnswers: null
      // showPopup: false,
      // recentBill: null
    };

    // this.getAnexoAnswers = this.getAnexoAnswers.bind(this);
    // this.newIvaAnswer = this.newIvaAnswer.bind(this);
    // this.showPopupButtons = this.showPopupButtons.bind(this);
  }

  componentDidMount() {
    // doFetch({
    //   endpoint: "getAnexoTotals",
    //   onOK: data => {
    //     this.setState({ BillResume: data });
    //   }
    // })

    doFetch({
      endpoint: "getAnexoQuestions",
      onOK: anexoQ => {
        this.setState({ AnexoQuestions: anexoQ });
      }
    });
    // }
    //
    // getAnexoAnswers() {
    doFetch({
      endpoint: "getAnexoAnswers",
      onOK: data => {
        this.setState({
          AnexoAnswers: data,
          newAnexoAnswer: null
        });
      }
    });
  }

  render() {
    const { AnexoQuestions, AnexoAnswers } = this.state;
    console.info("anexoQ", AnexoQuestions);
    console.info("anexoA", AnexoAnswers);
    return (
      <React.Fragment>
        <div className="buttons-menu">
        <button
          className="App-button iva-new-button"
          onClick={() => this.newIvaAnswer(1)}
        >
          Compra
        </button>
        </div>
        <div className="anexo-table">
          <div className="anexo-table-title">
            {AnexoQuestions &&
              AnexoQuestions.map(titleObj => (
                <div key={titleObj.id} className="anexo-title">
                  {titleObj.name}
                  <div className="iva-answer">
                    {AnexoAnswers
                      .filter(dataItem => dataItem.id === titleObj.id)
                      .map(dataItem => <div key={dataItem.id}>{dataItem.value}</div>)
                    }
                  </div>
                </div>
              ))}
          </div>

          {/*<div>
            <div className="anexo-title">RUC</div>
            <div className="anexo-answer">1234567894001</div>
          </div>
          <div>
            <div className="anexo-title">Nombre</div>
            <div className="anexo-answer">lokita SA</div>
          </div>
          <div>
            <div className="anexo-title">Tipo de Gasto</div>
            <div className="anexo-answer">Alimentación</div>
          </div>
          <div>
            <div className="anexo-title">Valor</div>
            <div className="anexo-answer">$3.31</div>
          </div>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default Anexo;
