import React, { Component } from 'react'
import {
  array as yupArray,
  object as yupObject,
  string as yupString
} from "yup";

import Form from '../../components/form/Form';
import FormIconInput from '../../components/form/FormIconInput';

class IvaForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newIvaAnswer: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, event) {
    let //name = event.target.name,
      value = event.target.value,
      { newIvaAnswer } = this.state

    // Setting Taxes values, 5 and 14 are subtotals
    if (newIvaAnswer[index].id === 5 || newIvaAnswer[index].id === 14) {
      newIvaAnswer[index + 1].value = value * 0.12
      newIvaAnswer[index + 2].value = value * 1 + (value * 0.12)
    }

    newIvaAnswer[index].value = value

    this.setState({
      newIvaAnswer
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.newIvaAnswer || prevState.newIvaAnswer[0][nextProps.data[0].name] === null) {
      return ({ newIvaAnswer: nextProps.newIvaAnswer })
    } else {
      return null
    }
  }

  render() {
    const { /*data, filter, */history } = this.props,
      { newIvaAnswer } = this.state
      console.info('newIvaAnswer', newIvaAnswer)

    if (newIvaAnswer.length > 0) return (
      <Form
        // style={{flex: 0.7}}
        className="iva-list-new"
        endpoint="saveAnswers"
        body={newIvaAnswer}
        validationSchema={yupArray().of(yupObject().shape({
          value: yupString().required("Ingrese un Valor")
        }))}
        submitButtonStyle={{flex: 'none', margin: '30px 5px 0', width: 210}}
        onSuccess={data => {
          //   pathname: '/iva',
          // });
          history.replace({pathname: '/'})
          setTimeout(history.replace({pathname: '/iva'}), 100)
        }}
        submitButton
      >
        {
          newIvaAnswer.map((item, index) => {
            let type
            if (item.type === "string") {
              type = "text"
            } else if (item.type === "double") {
              type = "number"
            } else {
              type = "date"
            }

            return (
              <FormIconInput
                key={item.id}
                name={item.name}
                type={type}
                label={item.name}
                value={this.state.newIvaAnswer[index].value}
                disabled={item.id === 6 || item.id === 7 || item.id === 15 || item.id === 16}
                onChange={event => this.handleChange(index, event)}
                classNames={["quest", type === "date" ? "input-width-70" : null]}
                style={{
                  margin: '10px 5px 0',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  alignItems: 'start'
                }}
                autoComplete="off"
              />
            )
          })
        }
      </Form>
    )
  }
}

export default IvaForm;
