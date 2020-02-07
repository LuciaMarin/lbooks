var miControlador = miModulo.controller(
        "loginValidate",
        function ($scope, $location, $routeParams, promesasService, auth) {

            $scope.fallo = false;
            $scope.hecho = false;
            $scope.falloMensaje = "";
            $scope.controller = "loginValidate";

            if (auth.data.status == 200 || $routeParams.token == null ) {
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
                }, function (response) {
                    $scope.mensaje = "Ha ocurrido un error";
                });
            $scope.login = function () {
                if ($scope.username != undefined && $scope.password != undefined) {
                    promesasService.ajaxLoginValidate($scope.username, $scope.password, $routeParams.token)
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
        });