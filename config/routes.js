miModulo.config(['$routeProvider',
    function ($routeProvider) {
         //-------Home---------------------------
         $routeProvider.when('/', {
            templateUrl: 'app/homeTemplate.html', controller: 'homeController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //---------Producto-----------------
        .when('/producto/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/producto/plist/plist.html', controller: 'productoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/plist/:rpp/:page/:filter', {
            templateUrl: 'app/producto/plist/plist.html', controller: 'productoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/remove/:id', {
            templateUrl: 'app/producto/remove/remove.html', controller: 'productoRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/view/:id', {
            templateUrl: 'app/producto/view/view.html', controller: 'productoViewController', css: 'app/producto/view/view.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/edit/:id', {
            templateUrl: 'app/producto/edit/edit.html', controller: 'productoEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/new', {
            templateUrl: 'app/producto/new/new.html', controller: 'productoNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/producto/fill', {
            templateUrl: 'app/producto/fill/fill.html', controller: 'productoFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //---------Producto-----------------
        .when('/tipoproducto/plist/:rpp/:page', {
            templateUrl: 'app/tipoproducto/plist/plist.html', controller: 'tipoproductoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipoproducto/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/tipoproducto/plist/plist.html', controller: 'tipoproductoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipoproducto/plist/:rpp/:page/:filter', {
            templateUrl: 'app/tipoproducto/plist/plist.html', controller: 'tipoproductoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipoproducto/remove/:id', {
            templateUrl: 'app/tipoproducto/remove/remove.html', controller: 'tipoproductoRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipoproducto/view/:id', {
            templateUrl: 'app/tipoproducto/view/view.html', controller: 'tipoproductoViewController', 
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipoproducto/edit/:id', {
            templateUrl: 'app/tipoproducto/edit/edit.html', controller: 'tipoproductoEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        $routeProvider.when('/tipoproducto/new', {
            templateUrl: 'app/tipoproducto/new/new.html', controller: 'tipoproductoNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //-------usuario------------------------
        .when('/usuario/plist/:rpp/:page', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/plist/:rpp/:page/:word', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })

        .when('/usuario/remove/:id', {
            templateUrl: 'app/usuario/remove/remove.html', controller: 'usuarioRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/view/:id', {
            templateUrl: 'app/usuario/view/view.html', controller: 'usuarioViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/edit/:id', {
            templateUrl: 'app/usuario/edit/edit.html', controller: 'usuarioEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/new', {
            templateUrl: 'app/usuario/new/new.html', controller: 'usuarioNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/usuario/fill', {
            templateUrl: 'app/usuario/fill/fill.html', controller: 'usuarioFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //-------tipousuario------------------------
        .when('/tipousuario/plist/:rpp/:page', {
            templateUrl: 'app/tipousuario/plist/plist.html', controller: 'tipousuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/tipousuario/plist/plist.html', controller: 'tipousuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/plist/:rpp/:page/:filter', {
            templateUrl: 'app/tipousuario/plist/plist.html', controller: 'tipousuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/remove/:id', {
            templateUrl: 'app/tipousuario/remove/remove.html', controller: 'tipousuarioRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/view/:id', {
            templateUrl: 'app/tipousuario/view/view.html', controller: 'tipousuarioViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/edit/:id', {
            templateUrl: 'app/tipousuario/edit/edit.html', controller: 'tipousuarioEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/tipousuario/fill', {
            templateUrl: 'app/tipousuario/fill/fill.html', controller: 'tipousuarioFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //-------perfilusuario------------------------
        .when('/perfil', {
            templateUrl: 'app/perfil/view.html', controller: 'usuarioViewPerfilController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/factura/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/factura/plist/plist.html',
            controller: 'facturaPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        .when('/misFacturas/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/factura/misFacturas/plist.html',
            controller: 'misFacturasController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        .when('/factura/remove/:id', {
            templateUrl: 'app/factura/remove/remove.html', controller: 'facturaRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/factura/view/:id', {
            templateUrl: 'app/factura/view/view.html', controller: 'facturaViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/factura/edit/:id', {
            templateUrl: 'app/factura/edit/edit.html', controller: 'facturaEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/factura/new', {
            templateUrl: 'app/factura/new/new.html', controller: 'facturaNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/factura/fill', {
            templateUrl: 'app/factura/fill/fill.html', controller: 'facturaFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })

        //-------compra------------------------
        .when('/misCompras/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/compra/misCompras/plist.html', controller: 'misComprasController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/plist/:rpp/:page', {
            templateUrl: 'app/compra/plist/plist.html', controller: 'compraPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/plist/:rpp/:page/:filter', {
            templateUrl: 'app/compra/plist/plist.html', controller: 'compraPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/compra/plist/plist.html', controller: 'compraPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/plist/:rpp/:page/:id?/:filter?', {
            templateUrl: 'app/compra/plist/plist.html', controller: 'compraPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/plistXfactura/:rpp/:page/:id/:filter', {
            templateUrl: 'app/compra/plistXfactura/plistXfactura.html', controller: 'compraPlistXFactura',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        }) 
        .when('/compra/plistXfactura/:rpp/:page/:id/:filter/:colOrder?/:order?', {
            templateUrl: 'app/compra/plistXfactura/plistXfactura.html', controller: 'compraPlistXFactura',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        }) 
        .when('/compra/remove/:id', {
            templateUrl: 'app/compra/remove/remove.html', controller: 'compraRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/view/:id', {
            templateUrl: 'app/compra/view/view.html', controller: 'compraViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/edit/:id', {
            templateUrl: 'app/compra/edit/edit.html', controller: 'compraEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/new', {
            templateUrl: 'app/compra/new/new.html', controller: 'compraNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/compra/fill', {
            templateUrl: 'app/compra/fill/fill.html', controller: 'compraFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //-------Carrito---------------------------
        .when('/carrito/plist', {
            templateUrl: 'app/carrito/plist/plist.html', controller: 'carritoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/carrito/empty/:rpp/:page', {
            templateUrl: 'app/carrito/empty/empty.html', controller: 'carritoEmptyController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
       
        //----------------------------------------------
        .when('/login', {
            templateUrl: 'app/usuario/login/login.html', controller: 'login', css: 'app/usuario/login/login.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/login-validate/:token?', {
            templateUrl: 'app/usuario/login-validate/login-validate.html', controller: 'loginValidate', css: 'app/usuario/login-validate/login-validate.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/signup', {
            templateUrl: 'app/usuario/signup/signup.html', controller: 'signup', css: 'app/usuario/signup/signup.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/logout', {
            templateUrl: 'app/usuario/logout/logout.html', controller: 'logout',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/recover', {
            templateUrl: 'app/usuario/recover/recover.html', controller: 'recover' , css: 'app/usuario/recover/recover.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        .when('/recover/password/:token', {
            templateUrl: 'app/usuario/recover/password/password.html', controller: 'password' , css: 'app/usuario/recover/password/password.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })
        //-----------------About-----------------------------
        .when('/about', {
            templateUrl: 'app/about.html', controller: 'aboutController' ,
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                },
            }
        })

        .otherwise({
            redirectTo: '/'
        })
    }])