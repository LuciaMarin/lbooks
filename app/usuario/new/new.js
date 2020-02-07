var miControlador = miModulo.controller(
    "usuarioNewController",
    function ($scope, $http, $location, promesasService, $routeParams, auth) {
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "usuarioNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxCheck()
            .then(function (response) {
                if (response.data.status == 200) {
                    $scope.session = true;
                    $scope.usuario = response.data.message;
                } else {
                    $scope.session = false;
                }
            }, function (response) {
                $scope.session = false;
            })

        $scope.new = function () {
            const datos = {
                dni: $scope.dni,
                nombre: $scope.nombre,
                apellido1: $scope.apellido1,
                apellido2: $scope.apellido2,
                email: $scope.email,
                login: $scope.login,
                password: forge_sha256($scope.password),
                tipo_usuario_id: $scope.tipo_usuario_obj.id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew('usuario', { params: jsonToSend })
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;

                });
        }

        $scope.tipoUsuarioRefresh = function (f, consultar) {
            var form = f;
            if ($scope.tipo_usuario_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet('tipo_usuario', $scope.tipo_usuario_obj.id)
                        .then(function (response) {
                            $scope.tipo_usuario_obj = response.data.message;
                            form.userForm.tipo_usuario_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.tipo_usuario_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.tipo_usuario_obj.$setValidity('valid', true);
                }
            } else {
                $scope.tipo_usuario_obj.desc = "";
            }
        };
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
)