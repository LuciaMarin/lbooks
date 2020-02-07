var miControlador = miModulo.controller(
    "signup",
    function ($scope, $location, promesasService, auth) {
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.controller = "signup";
        if (auth.data.status == 200) {
            $location.path('/');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;

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
        $scope.signup = function () {
            if ($scope.email != undefined && $scope.username != undefined && $scope.password != undefined && $scope.dni != undefined && $scope.nombre != undefined && $scope.apellido1 != undefined && $scope.apellido2 != undefined) {
                promesasService.ajaxSignup($scope.email, $scope.username, $scope.password, $scope.dni, $scope.nombre, $scope.apellido1, $scope.apellido2)
                    .then(function (response) {
                        if (response.data.status != 200) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.message;
                        } else {
                            $scope.session = true;
                            $scope.fallo = false;
                            $location.path("/");
                        }
                        $scope.hecho = true;
                    }, function (error) {
                        $scope.session = false;
                        $scope.hecho = true;
                        $scope.fallo = true;
                        $scope.falloMensaje = error.message + " " + error.stack;

                    });
            } else {
                $scope.fallo = true;
                $scope.falloMensaje = "Los campos no pueden estar vacios. ";
            }
        }
    }
)
