var miControlador = miModulo.controller(
    "usuarioEditController",
    function ($scope, $http, $routeParams, promesasService, auth,$location) {
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.id = $routeParams.id;
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxGet('usuario', $routeParams.id)
            .then(function (response) {
                $scope.dni = response.data.message.dni;
                $scope.nombre = response.data.message.nombre;
                $scope.apellido1 = response.data.message.apellido1;
                $scope.apellido2 = response.data.message.apellido2;
                $scope.email = response.data.message.email;
                $scope.login = response.data.message.login;
                $scope.password = response.data.message.password;
                $scope.tipo_usuario_obj = response.data.message.tipo_usuario_obj;
                $scope.tipo_usuario_obj_id = response.data.message.tipo_usuario_obj.id;
                $scope.tipo_usuario_obj_desc = response.data.message.tipo_usuario_obj.descripcion;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {
            const datos = {
                id: $routeParams.id,
                dni: $scope.dni,
                nombre: $scope.nombre,
                apellido1: $scope.apellido1,
                apellido2: $scope.apellido2,
                email: $scope.email,
                login: $scope.login,
                password: forge_sha256($scope.password),
                tipo_usuario_id: $scope.tipo_usuario_obj_id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('usuario', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        };

        $scope.tipoUsuarioRefresh = function (f, consultar) {
            var form = f;
            if ($scope.tipo_usuario_obj_id != null) {
                if (consultar) {
                    promesasService.ajaxGet('tipo_usuario', $routeParams.id)
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

        $scope.reset = function () {
            promesasService.ajaxGet('usuario', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.dni = respuesta.titulo;
                    $scope.nombre = respuesta.cuerpo;
                    $scope.apellido1 = respuesta.etiquetas;
                    $scope.apellido2 = respuesta.apellido2;
                    $scope.email = respuesta.email;
                    $scope.login = respuesta.login;
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };

        $scope.reset();

    }
)