
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
},

addClassNames = (initialClassName, classNames) => {
  if (typeof(classNames) === "string") {
    initialClassName += " " + classNames;
  } else if (classNames) {
    classNames.forEach(className => {
      initialClassName += " " + className;
    })
  }
  return initialClassName;
},

personTypeOptions = [
  { value: 'nat', label: 'Persona Natural' },
  // { value: 'jur', label: 'Persona Jurídica' },
  { value: 'obl', label: 'Obligada' }
],

onlinePathnamesList = [
  '/',
  '/iva',
  '/anexos',
  '/renta'
],
offlinePathnamesList = [
  '/',
  '/register',
  '/services',
  '/terms',
  '/payment',
  '/payment-result',
  '/profile'
],

serverURL = 'http://localhost:8050/',

clientURL = 'http://localhost:3000/'

export {
  iDCardValidator,
  addClassNames,
  personTypeOptions,
  onlinePathnamesList,
  offlinePathnamesList
};
