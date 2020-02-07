'use strict';
var miControlador = miModulo.controller('tipoproductoViewController',
    function ($scope, promesasService, $routeParams, auth, $location) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        promesasService.ajaxGet('tipo_producto', $routeParams.id)
            .then(function (response) {
                $scope.status = response.status;
                $scope.data = response.data.message;
            }, function (response) {
                $scope.status = response.status;
                $scope.data = response.data.message || 'Request failed';
            });
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
    }
);