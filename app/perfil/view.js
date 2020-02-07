'use strict';
var miControlador = miModulo.controller('usuarioViewPerfilController',
    function ($scope, auth, $location,promesasService) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authid = auth.data.message.id;
            $scope.authdni = auth.data.message.dni;
            $scope.authnombre = auth.data.message.nombre;
            $scope.authapellido1 = auth.data.message.apellido1;
            $scope.authapellido2 = auth.data.message.apellido2;
            $scope.authemail = auth.data.message.email;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
            $scope.authFactura = auth.data.message.link_factura;
        }
        /*Notifis mediante lista de carrito*/
        promesasService.ajaxListCarrito()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.status = response.data.status;
                    $scope.pagina = response.data.message;
                    if (response.data.message) {
                        if (response.data.message.length == 0) {
                            $scope.count = 0;
                        } else {
                            $scope.count = response.data.message.length;
                        }
                    } else {
                        $scope.count = 0;
                    }
                }
            }, function (response) {
                $scope.mensaje = "Ha ocurrido un error";
            });

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
);