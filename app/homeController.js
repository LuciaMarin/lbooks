miModulo.controller(
    "homeController",
    function ($scope, $routeParams, $window, promesasService, auth ) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.authid = auth.data.message.id;
        $scope.controller = "homeController";
        $scope.object = "producto";
        total = 0;

        if ($routeParams.page === undefined && $routeParams.rpp === undefined) {
            $scope.paginaActual = 1;
            $scope.rppActual = 12;
        } else {
            $scope.paginaActual = parseInt($routeParams.page);
            $scope.rppActual = parseInt($routeParams.rpp);
        }

  

        window.setTimeout(function(){promesasService.ajaxGetPage($scope.object, $scope.rppActual, $scope.paginaActual)
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;       
            }
            )},100); 

        promesasService.ajaxGetCount($scope.object)
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $scope.rppActual);

                paginacion(2);
                if($scope.botonera.indexOf($scope.paginaActual) === -1){
                    $window.location.href = "./";
                }
                if ($scope.paginaActual > $scope.numPaginas && $scope.numPaginas != 0) {
                    $window.location.href = `./?rpp=${$scope.rppActual}&page=${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./?rpp=${$scope.rppActual}&page=1`;
                }
            })

        /*Paginacion*/
        function paginacion(vecindad) {
            vecindad++;
            $scope.botonera = [];
            for (i = 1; i <= $scope.numPaginas; i++) {
                if (i == 1) {
                    $scope.botonera.push(i);
                } else if (i > ($scope.paginaActual - vecindad) && i < ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push(i);
                } else if (i == $scope.numPaginas) {
                    $scope.botonera.push(i);
                } else if (i == ($scope.paginaActual - vecindad) || i == ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push('...');
                }
            }
        }
        
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
           
        /*Add carrito*/
        $scope.add = function (id) {
            promesasService.ajaxAddCarrito(id, 1)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                        
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;   
                        promesasService.ajaxGet($scope.object,id)
                        .then(function successCallback(response){
                            if (response.data.status != 200) {
                                $scope.falloMensaje = response.data.message;
                            } else {
                                $scope.descripcion_carrito = response.data.message.descripcion;
                                $scope.autor_carrito = response.data.message.autor;
                                $scope.precio_carrito = response.data.message.precio;
                                $scope.imagen_carrito = response.data.message.imagen;
                                $(".modal-a").css("animation-name","fade");                              
                            }
                        })
                       
                        promesasService.ajaxListCarrito()
                            .then(function successCallback(response) {
                                if (response.data.status != 200) {
                                    $scope.falloMensaje = response.data.message;
                                } else {
                                    $scope.products = response.data.message;
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
                    $scope.hecho = true;
                    $(".modal-a").css("animation-name","none");  
                })
        }

    }
)
