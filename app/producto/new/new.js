var miControlador = miModulo.controller(
    "productoNewController",

    function ($scope, $http, $location, promesasService, auth,$routeParams) {
        $scope.object = "producto";
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "productoNewController";
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
            if($scope.myFile === undefined){
                $scope.foto = "default.png";
            } else{
                $scope.foto = guid()+$scope.myFile.name;
                uploadPhoto($scope.foto);
            }
            $("#spinner").append('<img src="./img/spinner.gif"></div>');
            const datos = {
                codigo: $scope.codigo,
                autor: $scope.autor,
                existencias: $scope.existencias,
                precio: $scope.precio,
                imagen: $scope.foto,
                descripcion: $scope.descripcion,
                tipo_producto_id: $scope.tipo_producto_obj.id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew($scope.object, { params: jsonToSend })
                .then(function successCallback(response) {
                    $("#spinner").empty().append(response);
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $("#spinner").empty().append(response);
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;

                });
        }

       function uploadPhoto(name) {

            var file = $scope.myFile;
            file = new File([file], name, {type: file.type});
            var oFormData = new FormData();
            oFormData.append('file', file);
            $http({
                headers: {'Content-Type': undefined},
                method: 'POST',
                data: oFormData,
                url: `http://localhost:8081/lbooks/json?ob=${$scope.object}&op=addimage`
            });

        }

        function guid() {

            return "ss-s-s-s-sss".replace(/s/g, s4);
        }

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.tipo_producto_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet('tipo_producto', $scope.tipo_producto_obj.id)
                        .then(function (response) {
                            $scope.tipo_producto_obj = response.data.message;
                            form.userForm.tipo_producto_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.tipo_producto_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.tipo_producto_obj.$setValidity('valid', true);
                }
            } else {
                $scope.tipo_producto_obj.descripcion = "";
            }
        };

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/');
        };
    }
).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);