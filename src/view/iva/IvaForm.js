import React, { Component } from "react";
import {
  array as yupArray,
  object as yupObject,
  string as yupString
} from "yup";

import Form from "../../components/form/Form";
import FormIconInput from "../../components/form/FormIconInput";
import FormIconSelect from "../../components/form/FormIconSelect";

class IvaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newIvaAnswer: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(index, event) {
    let value = event.target.value,
      { newIvaAnswer } = this.state;

    // Setting Taxes values, 5 and 14 are subtotals
    if (newIvaAnswer[index].id === 5 || newIvaAnswer[index].id === 14) {
      newIvaAnswer[index + 1].value = (value * 0.12).toFixed(2);
      newIvaAnswer[index + 2].value = (value * 1 + value * 0.12).toFixed(2);

      newIvaAnswer[index].value = Number(value).toFixed(2);
    } else {
      newIvaAnswer[index].value = value;
    }

    this.setState({
      newIvaAnswer
    });
  }

  handleSelectChange(index, value, options) {
    const label = options.find(item => item.value === value).label;
    let { newIvaAnswer } = this.state;

    // Setting Taxes values, 19 is Tax Retention
    if (newIvaAnswer[index].id === 19) {
      newIvaAnswer[index + 1].value =
        (newIvaAnswer[index - 4].value * Number(label)) / 100;
    }

    // Setting Taxes values, 21 is Source Retention
    if (newIvaAnswer[index].id === 21) {
      newIvaAnswer[index + 1].value =
        (newIvaAnswer[index - 7].value * Number(label)) / 100;
    }

    newIvaAnswer[index].value = label;

    this.setState({
      newIvaAnswer
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState.newIvaAnswer ||
      prevState.newIvaAnswer[0][nextProps.data[0].name] === null
    ) {
      return { newIvaAnswer: nextProps.newIvaAnswer };
    } else {
      return null;
    }
  }

  render() {
    const { data, history, filter } = this.props,
      { newIvaAnswer } = this.state;

    if (newIvaAnswer.length > 0)
      return (
        <React.Fragment>
          <div className="table-title-new">
            {filter === 1
              ? "Factura nueva de Compra"
              : "Factura nueva de Venta"}
          </div>
          <Form
            className="iva-list-new"
            endpoint="saveAnswers"
            body={newIvaAnswer}
            validationSchema={yupArray().of(
              yupObject().shape({
                value: yupString().required("Ingrese un Valor")
              })
            )}
            submitButtonStyle={{
              flex: "none",
              margin: "30px 5px 0",
              width: 210
            }}
            onSuccess={data => {
              history.replace({ pathname: "/" });
              setTimeout(history.replace({ pathname: "/iva" }), 100);
            }}
            submitButton
          >
            {newIvaAnswer.map((item, index) => {
              let type;
              if (item.type === "string") {
                type = "text";
              } else if (item.type === "double") {
                type = "number";
              } else if (item.type === "percentage") {
                type = "number";
              } else {
                type = "date";
              }

              let options = data.find(
                filtered =>
                  filtered.id === item.id && filtered.options.length > 0
              );

              options = options
                ? options.options.map(option => {
                    return {
                      value: option.id,
                      label: option.value
                    };
                  })
                : null;

              if (options) {
                return (
                  <FormIconSelect
                    key={item.id}
                    name={item.name}
                    label={item.name}
                    value={this.state.newIvaAnswer[index].value}
                    idValue="label"
                    onChange={value =>
                      this.handleSelectChange(index, value, options)
                    }
                    options={options}
                    classNames={["quest", "select-quest"]}
                    style={{
                      margin: "10px 5px 0",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      alignItems: "start",
                      color: "black"
                    }}
                  />
                );
              }
              return (
                <FormIconInput
                  key={item.id}
                  name={item.name}
                  type={type}
                  label={item.name}
                  value={
                    (newIvaAnswer[index].id === 5 ||
                      newIvaAnswer[index].id === 14) &&
                    !this.state.newIvaAnswer[index].value
                      ? (0).toFixed(2)
                      : this.state.newIvaAnswer[index].value
                  }
                  disabled={
                    item.id === 6 ||
                    item.id === 7 ||
                    item.id === 15 ||
                    item.id === 16 ||
                    item.id === 20 ||
                    item.id === 22
                  }
                  onChange={event => this.handleChange(index, event)}
                  classNames={[
                    "quest",
                    type === "date" ? "input-width-70" : null
                  ]}
                  style={{
                    margin: "10px 5px 0",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "start"
                  }}
                  autoComplete="off"
                  step="0.01"
                  pattern="^\d+(?:\.\d{1,2})?$"
                />
              );
            })}
          </Form>
        </React.Fragment>
      );
  }
}

export default IvaForm;
