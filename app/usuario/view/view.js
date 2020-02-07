var miControlador = miModulo.controller(
    "usuarioViewController",

    function ($scope, $routeParams, promesasService, auth) {
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        promesasService.ajaxGet('usuario', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.dni = response.data.message.dni;
                $scope.nombre = response.data.message.nombre;
                $scope.apellido1 = response.data.message.apellido1;
                $scope.apellido2 = response.data.message.apellido2;
                $scope.email = response.data.message.email;
                $scope.login = response.data.message.login;
                $scope.tipo_usuario_obj = response.data.message.tipo_usuario_obj.descripcion;
            }, function () {
                $scope.fallo = true;
            })

        $scope.volver = function () {
            window.history.back();
        };
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
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
)