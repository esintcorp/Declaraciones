const isAuthenticated = () => {
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.getItem("csrfToken") !== 'undefined') {
      console.info('TOKEEEENNNN', localStorage.getItem("csrfToken"))
      return true;
    }
  }
  return false;
},
getToken = () => {
  if (isAuthenticated()) {
    return localStorage.getItem('csrfToken');
  }
  return null;
};

export { getToken, isAuthenticated };
