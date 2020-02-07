'use strict';
var miControlador = miModulo.controller('tipoproductoEditController',
    function ($scope, $routeParams, promesasService,auth,$location) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
            $scope.controller = "tipoproductoEditController";
        }

        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        promesasService.ajaxGet('tipo_producto', $routeParams.id)
            .then(function (response) {
                $scope.status = response.status;
                $scope.id = response.data.message.id;
                $scope.descripcion = response.data.message.descripcion;
            }, function (response) {
                $scope.status = response.data.status;
                $scope.falloMensaje = response.data.message;
            });

        $scope.volver = function () {
            window.history.back();
        };
        
       
        $scope.editar = function () {
            const datos = {
                id: $scope.id,
                descripcion: $scope.descripcion
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            promesasService.ajaxUpdate('tipo_producto', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.hecho = true;
                });
        };
    }
);