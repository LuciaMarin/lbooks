var miControlador = miModulo.controller(
    "recover",
    function ($scope, $location, $routeParams, promesasService, auth) {
        $scope.object = "usuario";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.controller = "recover";

        if (auth.data.status == 200 ) {
            $location.path('/');
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
            }, function errorCallback(response) {
                console.log("Ha ocurrido un problema.");
            });

        $scope.recover = function () {
            if ($scope.email != undefined) {
                promesasService.ajaxRecover($scope.object, $scope.email)
                    .then(function (response) {
                        if (response.data.status != 200) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.message;
                        } else {
                            $scope.hecho = true;
                            $scope.fallo = false;
                            $scope.mensaje = response.data.message;
                            console.log($scope.mensaje);
                        }
                    }, function errorCallback(response) {
                        console.log(response);
                    });
            } else {
                $scope.fallo = true;
                $scope.falloMensaje = "Los campos no pueden estar vacios. ";
            }
        }
    });