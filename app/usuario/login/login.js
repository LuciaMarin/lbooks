var miControlador = miModulo.controller(
    "login",
    function ($scope, $location, promesasService, auth) {
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.controller = "login";

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
            }, function errorCallBack() {
                $scope.fallo = true;
                $scope.hecho = false;
                $scope.falloMensaje = "Ha ocurrido un error";

            });
        $scope.login = function () {
            if ($scope.username != undefined && $scope.password != undefined) {
                promesasService.ajaxLogin($scope.username, $scope.password)
                    .then(function (response) {
                        if (response.data.status != 200 || response.data.message.validate == false) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.message;
                            console.log(response.data.message);
                        } else {
                            $scope.session = true;
                            $scope.fallo = false;
                            $location.path("/");
                        }
                        $scope.hecho = true;
                    }, function errorCallBack(response) {
                        $scope.session = false;
                        $scope.fallo = true;
                        $scope.hecho = false;
                        $scope.falloMensaje = "Ha ocurrido un error";
                        console.log(response.data.message);

                    });
            } else {
                $scope.fallo = true;
                $scope.falloMensaje = "Los campos no pueden estar vacios. ";
            }
        }
        //ADMIN
        $scope.loginAd = function () {
            $scope.username = "lbooks";
            $scope.password = "lbooks";
            promesasService.ajaxLogin($scope.username, $scope.password)
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
                }, function errorCallBack(error) {
                    $scope.session = false;
                    $scope.fallo = true;
                    $scope.hecho = false;
                    $scope.falloMensaje = "Ha ocurrido un error";

                });
        }
        $scope.loginCli = function () {
            $scope.username = "madece1102";
            $scope.password = "lbooks";
            promesasService.ajaxLogin($scope.username, $scope.password)
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
                }, function errorCallBack(error) {
                    $scope.session = false;
                    $scope.fallo = true;
                    $scope.hecho = false;
                    $scope.falloMensaje = "Ha ocurrido un error";

                });
        }
        $scope.loginGoogle = function () {
            var GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.signIn().then((googleUser) => {
                promesasService.ajaxGoogleLogin(googleUser)
                .then(function (response) {
                        $location.path("/");
                }, function errorCallBack(error) {
                    $scope.session = false;
                    $scope.fallo = true;
                    $scope.hecho = false;
                    $scope.falloMensaje = "Ha ocurrido un error";
                    console.log(error);

                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }
);