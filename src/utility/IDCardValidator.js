
const iDCardValidator = cedula => {
  if (typeof(cedula) === 'string' && cedula.length === 10 && /^\d+$/.test(cedula)) {
    var digitos = cedula.split('').map(Number);
    var codigo_provincia = digitos[0] * 10 + digitos[1];

    //if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30) && digitos[2] < 6) {

    if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia === 30)) {
      var digito_verificador = digitos.pop();

      var digito_calculado = digitos.reduce(
        function (valorPrevio, valorActual, indice) {
          return valorPrevio - (valorActual * (2 - indice % 2)) % 9 - (valorActual === 9) * 9;
        }, 1000) % 10;
      return digito_calculado === digito_verificador;
}
  }
  return false;
};

export { iDCardValidator };

// Function to add to yupString and compare the startTime and endTime fields.
  // function compareTime(ref, msg) {
  //   return this.test({
  //     name: "compareTime",
  //     exclusive: false,
  //     message: msg,
  //     test(timeValue) {
  //       if (timeValue) {
  //         const timeRef = this.resolve(ref),
  //           datetimeRef = new Date(`2000-01-01T${timeRef}Z`),
  //           datetimeValue = new Date(`2000-01-01T${timeValue}Z`);
  //         return datetimeRef < datetimeValue;
  //       }
  //       return this;
  //     }
  //   });
  // }
  // addMethod(yupString, "compareTime", compareTime);
