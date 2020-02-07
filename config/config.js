miModulo.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])

miModulo.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode({
      //requireBase: false,
      enabled: true
  });
}]);
/*
datelocale
*/
miModulo.config(function ($mdDateLocaleProvider) {
  // Example of a Spanish localization.
  $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
  $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
    return 'Semana ' + weekNumber;
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
  $mdDateLocaleProvider.formatDate = function (date) {
    return moment(date).format('DD-MM-YYYY');
  };
})

miModulo.config(function () {
  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id: '165552183735-umlcclrgi0vpu7u5pp6mg1burt8fohiv.apps.googleusercontent.com'
    });
  });

});