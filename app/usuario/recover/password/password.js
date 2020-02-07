var miControlador = miModulo.controller(
    "password",
    function ($scope, $location, $routeParams, promesasService, auth) {
        $scope.object = "usuario";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.controller = "password";

        if (auth.data.status == 200 || $routeParams.token == null) {
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

        $scope.changePassword = function () {
            if ($scope.password === $scope.password2) {
                promesasService.ajaxChangePassword($scope.object, $scope.password, $routeParams.token)
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
                $scope.falloMensaje = "Las contraseñas son diferentes. ";
            }
        }
    });