import React from "react";
import { getToken } from './Authentication';

/*
 * Saves ids of SessionInformation in Storage.
 */
const saveUserOnStorage = (storage, data) => {
  storage.save({
    key: "user",
    data: {
      businessId: data.sessionInformation.currentBusiness && data.sessionInformation.currentBusiness.id,
      officeId: data.sessionInformation.currentOffice && data.sessionInformation.currentOffice.id,
      userId: data.sessionInformation.user && data.sessionInformation.user.id
    }
  });
};

const getSessionInfoFunction = async () => {

    console.info('token:', getToken());
    let result;
    await fetch('http://localhost:8050/getSessionInfo', {
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
          console.error(response)
        } else {
          console.info("object", data)
          result = data;
        }
      }).catch(errors => {
        console.error(errors)
      })
      // if (response && response.ok) {
        // localStorage.setItem("csrfToken", undefined);
        // afterLogout();
        // console.info(getToken())
      // }
    }).catch(errorfetch => {
      console.error(errorfetch)
    });
    return result;
  };

class AppLoader extends React.Component {
// const AppLoader = ({ authenticated, loaderComponent, children, storage, ...restProps }) => (

  constructor(props) {
    super(props);

    this.state = {
      sessionInfo: {}
    };
  }


  componentDidMount() {
    fetch('http://localhost:8050/getSessionInfo', {
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
          console.info('hola')
        } else {
          console.info("object", data)
          this.setState({ sessionInfo: data });
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
// console.info('state info', getSessionInfoFunction().then(data => {
  console.info('props',this.props)
// }))
    const { children } = this.props;
    if (this.state.sessionInfo.firstName) {
      console.info('jjjjjjjjj', this.state)
      return children({authenticated: true});//<div>{this.state.sessionInfo.firstName}</div>;
    }
    return children({authenticated: false});//<div>NO HOLA</div>;
  }
};

export default AppLoader;
