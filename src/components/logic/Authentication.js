const isAuthenticated = () => {
  // if (typeof(Storage) !== "undefined") {
  //   if (localStorage.getItem("csrfToken")) {
  //     console.info('TOKEEEENNNN', localStorage.getItem("csrfToken"))
  //     return true;
  //   }
  // }
  return false;
}

export { isAuthenticated };
