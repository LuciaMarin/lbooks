var miControlador = miModulo.controller(
    "carritoPlistController",

    function ($scope, promesasService, $window, auth, $location) {
        $scope.controller = "carritoPlistController";
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.authid = auth.data.message.id;
        $scope.fallo = false;
        $scope.hecho = false;
        total = 0;

        $scope.loadList = function () {
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
                    for (i = 0; i < $scope.count; i++) {
                        cantidad = $scope.pagina[i].cantidad;
                        precioUniCant = parseFloat($scope.pagina[i].producto_obj.precio);
                        total += precioUniCant * cantidad;

                    }
                    $scope.total = total.toFixed(2);
                }
            });
        }
        $scope.loadList();
        /*Metodo buy*/
        $scope.buy = function () {
            promesasService.ajaxBuy()
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.hecho = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.mensaje = "Gracias por su compra.";
                        $scope.loadList();
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.hecho = false;
                    $scope.falloMensaje = "Inicia sesión con este enlace para poder comprar";
                });
        }
        /*Metodo Remove*/
        $scope.remove = function (producto) {
            promesasService.ajaxRemoveCarrito(producto)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = false;
                        $scope.delete = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.delete = true;
                        $window.location.reload();
                        
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.delete = false;
                    $scope.mensaje = "Ha ocurrido un error al borrar este producto";
                });
        }
        /*Metodo vaciar*/
        $scope.empty = function () {
            promesasService.ajaxEmptyCarrito()
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = false;
                        $scope.empty = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.empty = true;
                        $window.location.reload();
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.empty = false;
                    $scope.mensaje = "Ha ocurrido un error al vaciar el carrito";
                });

        }

        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
)