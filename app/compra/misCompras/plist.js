var miControlador = miModulo.controller(
    "misComprasController",
    //-----------------------------Pedidos de una factura en concreto-------------------------
    function ($scope, $routeParams, $http, promesasService, $window, auth, $location) {
        $scope.object = "compra";
        if (auth.data.status != 200) {
            $location.path('/login');
        } 

        if ($routeParams.factura == null) {
            $location.path('/');
        } 

        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel =  auth.data.message.tipo_usuario_obj;

        $scope.controller = "misComprasController";
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];   
        
        if ($routeParams.factura !== undefined) {
            $scope.id_factura = parseInt($routeParams.factura);
            $scope.filter = "factura";
            $scope.date = $routeParams.date;
        } else {
            $scope.factura_id = null;
            $scope.filter = null;
        }

        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

        window.setTimeout(function(){promesasService.ajaxGetPage($scope.object,$scope.rppActual,$scope.paginaActual,$scope.colOrder,$scope.order,$scope.id_factura,$scope.filter)
        .then(function (response) {
            $scope.status = response.data.status;
            $scope.pagina = response.data.message;
        }
        )},100); 

        $scope.search = function () {
            promesasService.ajaxSearch($scope.object, $scope.rppActual, $scope.paginaActual, $scope.word)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;

                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.pagina = response.data.message;

                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        promesasService.ajaxGetCount($scope.object,$scope.id_factura, $scope.filter )
        .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $routeParams.rpp);
                $scope.calcPage = [];
                for (const p of $scope.rppS) {
                    const res = $scope.paginaActual / $scope.numPaginas;
                    const next = Math.ceil($scope.numRegistros / p);
                    $scope.calcPage.push(Math.ceil(res * next));
                }
                paginacion(2);
                if ($scope.paginaActual > $scope.numPaginas && $scope.numPaginas != 0) {
                    $window.location.href = `./compra/${$scope.rppActual}/${$scope.numPaginas}/${$scope.id_factura}/${$scope.filter}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./compra/${$scope.rppActual}/1/${$scope.id_factura}/${$scope.filter}`;
                }
            })

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
    }
)