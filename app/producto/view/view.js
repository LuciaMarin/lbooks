var miControlador = miModulo.controller(
    "productoViewController",
    function ($scope, $routeParams, promesasService, auth, $location) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.authid = auth.data.message.id;
        $scope.controller = "productoViewController";
        $scope.cantidad = 1;
        //Regex 
        $scope.regex = '\\d+';

        promesasService.ajaxGet('producto', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.codigo = response.data.message.codigo;
                $scope.autor = response.data.message.autor;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.descripcion = response.data.message.descripcion;
                $scope.tipo_producto_obj = response.data.message.tipo_producto_obj;
            }), function errorCallback(response) {
                console.log(response.data.message);
                $scope.hecho = false;
                $scope.fallo = false;
                $scope.falloMensaje = response.data.message;
            };
           
        $scope.cantidadRefresh = function(){
                if ($scope.cantidad > $scope.existencias) {  
                    $scope.cantidad = $scope.existencias;
                }
                if ($scope.cantidad < 1) {   
                    $scope.cantidad = 1;
                }
                if($scope.cantidad == null || $scope.cantidad == ''){
                    $scope.cantidad = 1;
                }
        }
        $scope.menos = function () {
            
            if ($scope.cantidad == 1) {
                $scope.cantidad = 1;
            } else {
                $scope.cantidad--;
            }
        }
        $scope.mas = function () {
            if ($scope.cantidad >= $scope.existencias) {
                $scope.cantidad = $scope.existencias;
            } else {
                $scope.cantidad++;
            }
        }
        

        $scope.add = function () {
            promesasService.ajaxAddCarrito($scope.id, $scope.cantidad)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.hecho = true;
                        $scope.falloMensaje = response.data.message;
                        console.log(response.data.message);
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $location.path("/carrito/plist");
                    }
                }), function errorCallback(response) {
                    console.log(response.data.message);
                    $scope.hecho = false;
                    $scope.fallo = true;
                    $scope.falloMensaje = response.data.message;
                };
        }

        $scope.volver = function () {
            window.history.back();
        };

        /*Lista de carrito*/
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
                console.log("Carrito no disponble");
            });
    }
)
