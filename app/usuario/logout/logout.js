miModulo.controller(
    "logout",
    function ($scope, $location, promesasService, auth) {
        //--
        $scope.controller = "logout";
        //--
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        //--
        promesasService.ajaxLogout()
            .then(function (response) {
                    $location.path('/login');     
            }, function (error) {
                $scope.hecho = true;
                $scope.fallo = true;
                $scope.falloMensaje = "Error al cerrar la sesión";
            });
    }
)
