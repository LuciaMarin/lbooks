var miControlador = miModulo.controller(
    "compraNewController",

    function ($scope, $http, $location, promesasService, auth,$routeParams) {
        $scope.object = "compra";
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "compraNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        if($routeParams.factura != null){
            $scope.id_factura = $routeParams.factura;
        }

        $scope.new = function () {
           
            const datos = {
                cantidad: $scope.cantidad,
                producto_id: $scope.producto_obj.id,
                factura_id: $scope.factura_obj.id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew($scope.object, { params: jsonToSend })
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
                }, function errorCallback(response) {
                    $scope.fallo = true;
                    $scope.hecho = false;
                    console.log("Ha ocurrido un error");
                });
        }

        $scope.productoRefresh = function (f2, consultar2) {
            var form = f2;
            if ($scope.producto_obj.id != null) {
                if (consultar2) {
                    promesasService.ajaxGet("producto", $scope.producto_obj.id)
                        .then(function (response) {
                            $scope.producto_obj = response.data.message;
                            form.userForm.producto_obj.$setValidity('valid', true);
                        }, function errorCallback(response) {
                            form.userForm.producto_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.producto_obj.$setValidity('valid', true);
                }
            } else {
                $scope.producto_obj.codigo = "";
            }
        };

        $scope.facturaRefresh = function (f, consultar) {
            var form = f;
            if ($scope.factura_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet("factura", $scope.factura_obj.id)
                        .then(function (response) {
                            $scope.factura_obj = response.data.message;
                            form.userForm.factura_obj.$setValidity('valid', true);
                        }, function errorCallback(response) {
                            form.userForm.factura_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.factura_obj.$setValidity('valid', true);
                }
            } else {
                $scope.factura_obj.id = "";
                $scope.factura_obj.fecha = "";
            }
        };

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/');
        };
    }
)