var miControlador = miModulo.controller(
    "misFacturasController",
    //-----------------------------lISTA DE FACTURAS---------------------------------
    function ($scope, $routeParams, $http, promesasService, $window, auth,$location) {
        $scope.object = 'factura';

        if (auth.data.status != 200) {
            $location.path('/login');
        }

        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        $scope.client = auth.data.message.tipo_usuario_obj["descripcion"];
          
        $scope.controller = "misFacturasController";

        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);

        $scope.rppS = [10, 50, 100];

        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

        if ( $scope.colOrder == null && $scope.order == null && $scope.user_id == null && $scope.filter == null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual;
        } else if($scope.user_id != null &&  $scope.filter != null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +"&filter="+ $scope.filter + "&id=" + $scope.user_id;
        } else if($scope.user_id != null &&  $scope.filter != null && $scope.colOrder != null && $scope.order != null) {
            request = "http://localhost:8081/lbooks/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&filter="+ $scope.filter + "&id=" + $scope.user_id + "&order=" + $scope.colOrder + "&direccion="+$scope.order;
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

        
        if($scope.user_id == null && $scope.filter == null){
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
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/1`;
                }
            })
        } else {
            promesasService.ajaxGetCount($scope.object,$scope.user_id, $scope.filter )
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
                if ($scope.paginaActual > $scope.numPaginas) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/${$scope.numPaginas}/${$scope.user_id}/${$scope.filter}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/1/${$scope.user_id}/${$scope.filter}`;
                }
            })
        }
        
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

        /* PDFs */
        $scope.download = function (factura) {
            promesasService.ajaxGetPage("compra", 200, 1, null, null, factura.id, "factura").then((response) => {
                let nombre_completo = `${factura.usuario_obj.nombre} ${factura.usuario_obj.apellido1} ${factura.usuario_obj.apellido2}`;
                let compras = response.data.message;
                const doc = new jsPDF();
                const logo = "data:image/png;base64,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";
    
                function header(table_active) {
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, 10, 130, 34, 'F'); // Primera fila, caja izquierda
                    doc.rect(144, 10, 57, 16, 'F'); // Primera fila, caja derecha arriba
                    doc.rect(144, 28, 57, 16, 'F'); // Primera fila, caja derecha abajo
                    if (table_active) doc.rect(10, 48, 191, 14, 'F'); // Segunda fila, caja completa
                    /* Contenido primera fila, caja izquierda */
                    doc.addImage(logo, 'PNG', 12, 12, 30, 30); // Logo
                    doc.setFontSize(16);
                    doc.setFontType('bold');
                    doc.text('L-Books', 48, 20);
                    doc.setFontSize(12);
                    doc.setFontType('bolditalic');
                    doc.text('¡Todo lo que necesitas y más!', 48, 26);
                    doc.setFontType('normal');
                    doc.text('C/El Paraíso, s/n. 46009 Valencia', 48, 32);
                    doc.text('NIF: 12345678C', 48, 38);
                    /* Contenido primera fila, caja derecha arriba */
                    doc.setFontSize(12);
                    doc.text(148, 17, `Nº de Factura: ${factura.id}`);
                    doc.text(148, 23, `Fecha: ${moment(new Date(factura.fecha)).format('MM/DD/YYYY')}`);
                    /* Contenido primera fila, caja derecha abajo */
                    doc.setFontSize(12);
                    doc.setFontType('bold');
                    doc.text(148, 34, 'Para:');
                    doc.setFontType('normal');
                    doc.text(148, 40, nombre_completo);
                    /* Contenido segunda fila, caja completa */
                    if (table_active) {
                        doc.setFontSize(11);
                        doc.setFontType('bold');
                        doc.text('Concepto', 14, 56);
                        doc.text('Precio', 88, 56);
                        doc.text('Unidades', 112, 56);
                        doc.text('Subtotal', 141, 56);
                        doc.text('IVA', 167, 56);
                        doc.text('Total', 182, 56);
                    }
                }
    
                function footer(p) {
                    /* Caja footer */
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, 274, 191, 14, 'F');
                    /* Contenido */
                    doc.setFontType('normal');
                    doc.text('L-Books', 14, 282);
                    doc.setFontType('bold');
                    doc.text(`Página ${p}`, 97, 282);
                    doc.setFontType('normal');
                    doc.text(moment().format('DD/MM/YYYY'), 177, 282);
                }
    
                let pos_rect = 62;
                let pos_text = 70;
                let page = 1;
                let compras_length = compras.length;
                let total = 0;
                let subtotal = 0;
                header(true);
                footer(page);
                for (let x = 0; x < compras_length; x++) {
                    if (x % 14 === 0 && x !== 0) {
                        doc.addPage();
                        header(true);
                        page++;
                        footer(page);
                        pos_rect = 62;
                        pos_text = 70;
                    }
                    /* Filas tabla */
                    x % 2 === 0 ? doc.setFillColor(250, 250, 250) : doc.setFillColor(245, 245, 245);
                    doc.rect(10, pos_rect, 191, 14, 'F');
                    pos_rect += 14;
    
                    /* Contenido tabla */
                    doc.setFontSize(10);
                    doc.setFontType('normal');
                    doc.text(String(compras[x].producto_obj.descripcion), 14, pos_text);
                    doc.text(String(compras[x].producto_obj.precio) + '€', 88, pos_text);
                    doc.text(String(compras[x].cantidad), 112, pos_text);
    
                    let item_subtotal = Math.round((compras[x].producto_obj.precio * compras[x].cantidad) * 100) / 100;
                    let item_total = Math.round(((1 + (factura.iva / 100)) * item_subtotal) * 100) / 100;
    
                    subtotal += item_subtotal;
                    total += item_total;
    
                    doc.text(String(item_subtotal) + '€', 141, pos_text);
                    doc.text(String(factura.iva) + '%', 167, pos_text);
                    doc.text(String(item_total) + '€', 182, pos_text);
    
                    pos_text += 14;
                    if (x + 1 === compras_length) {
                        if (compras_length > 10) {
                            doc.addPage();
                            header(false);
                            page++;
                            footer(page);
                            pos_rect = 37;
                            pos_text = 45;
                        }
                        doc.setFillColor(245, 245, 245);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 18, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFillColor(250, 250, 250);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 32, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFillColor(245, 245, 245);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 46, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFontType('bold');
                        doc.text('Base imponible', 138, pos_text + 18);
                        doc.text('IVA 21%', 150, pos_text + 32);
                        doc.text('Total', 155, pos_text + 46);
                        doc.setFontType('normal');
                        doc.text(`${Math.round(subtotal * 100) / 100}€`, 175, pos_text + 18);
                        doc.text(`${Math.round((total - subtotal) * 100) / 100}€`, 175, pos_text + 32);
                        doc.text(`${Math.round(total * 100) / 100}€`, 175, pos_text + 46);
                    }
                }
                doc.save('test.pdf');
            });
        }
        
    }
)