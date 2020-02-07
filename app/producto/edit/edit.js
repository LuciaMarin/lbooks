
var miControlador = miModulo.controller(
    "productoEditController",
    function ($scope, $http, $routeParams, promesasService, auth, $location) {
        $scope.object = "producto";
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "productoEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxGet($scope.object, $routeParams.id)
            .then(function (response) {
                $scope.codigo = response.data.message.codigo;
                $scope.autor = response.data.message.autor;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.descripcion = response.data.message.descripcion;
                $scope.tipo_producto_id = response.data.message.tipo_producto_obj.id;
                $scope.tipo_producto_obj_descripcion = response.data.message.tipo_producto_obj.descripcion;
            }, function () {
                $scope.fallo = true;
            },100);

        $scope.modificar = function () {
            if($scope.myFile === undefined){
                $scope.foto = $scope.imagen;
            } else{
                $scope.foto = guid()+$scope.myFile.name;
                uploadPhoto($scope.foto);
            }
            const datos = {
                id: $routeParams.id,
                codigo: $scope.codigo,
                autor: $scope.autor,
                existencias: $scope.existencias,
                imagen: $scope.foto,
                precio: $scope.precio,
                descripcion: $scope.descripcion,
                tipo_producto_id: $scope.tipo_producto_id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate($scope.object, {
                params: jsonToSend
            })
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
        /*SUBIR IMAGEN*/
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
            if ($scope.tipo_producto_id != null) {
                if (consultar) {
                    promesasService.ajaxGet('tipo_producto', $scope.tipo_producto_id)
                        .then(function (response) {
                            $scope.tipo_producto_obj_descripcion = response.data.message.descripcion;
                            form.userForm.tipo_producto_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.tipo_producto_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.tipo_producto_obj.$setValidity('valid', true);
                }
            } else {
                $scope.tipo_producto_obj_descripcion = "";
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