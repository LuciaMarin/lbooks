var miControlador = miModulo.controller(
    "aboutController",
    function ($scope, auth, $routeParams, $location) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.authid = auth.data.message.id;
        $scope.controller = "aboutController";
        $scope.campo = $routeParams.order;
        $scope.direction = $routeParams.direction;

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/');
        };

    }
)