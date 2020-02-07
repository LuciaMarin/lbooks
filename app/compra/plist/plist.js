var miControlador = miModulo.controller(
    "compraPlistController",
    //-----------------------------lISTA DE PEDIDOS EN GENERAL---------------------------------  
    function ($scope, $routeParams, $http, promesasService, $window, auth,$location) {
        $scope.object = "compra";

        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } 

        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel =  auth.data.message.tipo_usuario_obj;   
        $scope.controller = "compraPlistController";
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];
        
        $scope.id_factura = $routeParams.id;
        $scope.filter = $routeParams.filter;
        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

        /*Getpage*/
        if ( $scope.colOrder == null && $scope.order == null && $scope.id_factura == null && $scope.filter == null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual;
        } else if($scope.id_factura != null &&  $scope.filter != null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&filter="+ $scope.filter + "&id=" + $scope.id_factura;
        } else if($scope.id_factura != null &&  $scope.filter != null && $scope.colOrder != null && $scope.order != null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&filter="+ $scope.filter + "&id=" + $scope.id_factura + "&order=" + $scope.colOrder + "&direccion="+$scope.order;
        } else {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&order=" + $scope.colOrder + "&direccion="+$scope.order;
        }

        $http({
            method: "GET",
            withCredentials: true,
            url: request
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.pagina = response.data.message;        
        });

        

        promesasService.ajaxGetCount($scope.object)
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
                    $window.location.href = `./${scope.object}/${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${scope.object}/${$scope.rppActual}/1`;
                }
            })

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