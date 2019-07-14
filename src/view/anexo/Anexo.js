import React, { Component } from "react";
// import { doFetch } from '../../utility/Util';

class Anexo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <React.Fragment>
      <div className="buttons-menu">
      </div>
      <div className="anexo-table">
        <div>
          <div className="anexo-title">
            RUC
          </div>
          <div className="anexo-answer">
            1234567894001
          </div>
        </div>
        <div>
          <div className="anexo-title">
            Nombre
          </div>
          <div className="anexo-answer">
            lokita SA
          </div>
        </div>
        <div>
          <div className="anexo-title">
            Tipo de Gasto
          </div>
          <div className="anexo-answer">
            Alimentación
          </div>
        </div>
        <div>
          <div className="anexo-title">
            Valor
          </div>
          <div className="anexo-answer">
            $3.31
          </div>
        </div>
      </div>
    </React.Fragment>;
  }
}

export default Anexo;
