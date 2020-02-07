var miControlador = miModulo.controller(
    "facturaFillController",
    function ($scope, promesasService, auth, $location) {
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        //--
        $scope.controller = "facturaFillController";
        //--
        $scope.mensaje = "";
        $scope.fallo = false;
        $scope.hecho = false;
        //--
        $scope.crear = function (numero) {
            promesasService.ajaxFill('factura', numero).then(function (response) {
                if (response.data.status == 200) {
                    $scope.fallo = false;
                    $scope.hecho = true;
                    $scope.mensaje = "Se han insertado todos los registros.";
                } else {
                    $scope.fallo = true;
                    $scope.hecho = true;
                    $scope.mensaje = "No se ha podido realizar la operación.";
                }
            }, function () {
                $scope.fallo = true;
                $scope.hecho = true;
                $scope.mensaje = "No se ha podido realizar la operación.";
            });
        }
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
        //--
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };

    }
)