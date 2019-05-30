import React, { Component } from 'react'

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
    let name = event.target.name,
      value = event.target.value,
      { newIvaAnswer } = this.state

    newIvaAnswer[index].value = value

    this.setState({
      newIvaAnswer
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.newIvaAnswer || prevState.newIvaAnswer[0][nextProps.data[0].name] === null) {
      return ({ newIvaAnswer: nextProps.newIvaAnswer }) // <- this is setState equivalent
    } else {
      return null
    }
  }

  render() {
    const { data, filter } = this.props,
      { newIvaAnswer } = this.state

    if (newIvaAnswer.length > 0) return (

      <Form
        // style={{flex: 0.7}}
        className="iva-list-buy"
        endpoint="saveAnswers"
        body={{
          ...this.state.newIvaAnswer,
          // status: 'active',
          // user: subscription && subscription.user
        }}
        // validationSchema={yupObject().shape({
        //   cardName: yupString().required("Ingrese el nombre de su tarjeta"),
        //   cardNumber: yupString().required("Ingrese el número de su tarjeta"),
        //   expirationDate: yupDate().required("Ingrese la fecha en que expira su tarjeta"),
        //   cvv: yupString().required("Ingrese el código CVV o CVC de su tarjeta"),
        // })}
        // submitButtonStyle={{width: '20vmin'}}
        onSuccess={data => {
          // history.push({
          //   pathname: '/iva',
          //   // state: {
          //   //   paymentResult: data
          //   // }
          // });
        }}
        submitButton
      >
      {newIvaAnswer.map(item => {
        let type
        if (item.type === "string") type = "text"
        else if (item.type === "double") type = "number"
        else type = "date"

        return (
          <FormIconInput
            key={item.id}
            name={item.name}
            type={type}
            label={item.name}
            value={this.state.newIvaAnswer[item.id-1].value}
            onChange={event => this.handleChange(item.id-1, event)}
            // iconName="envelope"
            classNames="quest"
            style={{marginTop: 10, marginRight: 10, justifyContent: 'space-between', flex: 1, flexDirection: 'column'}}
          />
        )
      })}
      </Form>
    )
  }
}

export default IvaForm;
