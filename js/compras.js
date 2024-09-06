let productos = JSON.parse(localStorage.getItem('productos')) || [];
let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
let compras = JSON.parse(localStorage.getItem('compras')) || [];
let carrito = [];

function listarProductos() {
    let lista = document.getElementById('listaproductos');
    let html = '';
    productos.forEach(function (producto, index) {
        html += `
            <tr>
              
              
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
              
                <td style="text-align: center;">
                <div style="display: flex; justify-content: center;">
                  <button onclick="agregarCarrito(${index})" class="btn btn-show m5" >
                    <i class="fa fa-plus" style="font-size: 16px;"></i>
                  </button>
                
                </div>
              </td>

            </tr>
        `;
    });

    if (productos.length == 0) {
        html += `
              <tr>
                  <td colspan="4" align="center">
                  
                  <br>
                  <br>
                  No hay productos registrados
                  <br>
                  <br>
                  <br>
                  <a href="productosForm.html" class="btn btn-nuevo">
                      <i class="fa fa-plus"></i> Nuevo
                </a>
                  <br>
                  <br>
                  <br>
                  <br>
                  </td>
              </tr>
          `;
    }

    lista.innerHTML = html;
}

function buscarProductos() {
    let buscar = document.getElementById('buscar').value;
    let nuevoArray = [];

    if (buscar.trim() == '' || buscar.trim() == null) {
        nuevoArray = JSON.parse(localStorage.getItem('productos') || []);
    } else {
        for (let i = 0; i < productos.length; i++) {
            let texto = productos[i].nombre.toLowerCase();
            if (texto.search(buscar.toLowerCase()) >= 0) {
                nuevoArray.push(productos[i]);
            }
        }
    }
    productos = nuevoArray;
    listarProductos();
}

function listarProveedores() {
    let lista = document.getElementById('proveedor');
    let html = '';
    proveedores.forEach(function (proveedor) {
        html += `
        <option value="${proveedor.empresa}">${proveedor.empresa}</option>
        `;
    });

    lista.innerHTML = html;
}

function agregarCarrito(parametro) {
    console.log(productos[parametro]);
    let elemento = {
        producto: productos[parametro].nombre,
        precio: productos[parametro].precio,
        stock: productos[parametro].stock,
        cantidad: 1,
        subtotal: function () {
            return this.cantidad * this.precio;
        },
    };
    console.log(elemento);
    carrito.push(elemento);
    listarCarrito();
}

function listarCarrito() {
    let lista = document.getElementById('listacarrito');
    let html = '';
    carrito.forEach(function (compra, index) {
        html += `
         <tr>
             <td> ${compra.producto} </td>
             <td>${compra.precio}</td>
             <td>
               <input type="number" onchange="cambiaCantidad(${index}, this)" value=${
            compra.cantidad
        } class="form" placeholder="Cantidad" id="cantidad">
             </td>
             <td>${compra.subtotal()}</td>
             <td>
               <button onclick="quitarCarrito(${index})" class="btn btn-delete m5">
                 <i class="fa fa-times"></i>
               </button>
             </td>
        </tr> `;
    });
    console.log(carrito);

    lista.innerHTML = html;
    calcularTotal();
}

function quitarCarrito(posicion) {
    carrito.splice(posicion, 1);
    listarCarrito();
}

function calcularTotal() {
    let total = document.getElementById('total');
    let suma = 0;
    carrito.forEach(function (compra) {
        suma += compra.subtotal();
    });
    total.innerText = suma;
}

function cambiaCantidad(posicion, elemento) {
    console.log(elemento.value);

    if (elemento.value < 1) {
        Swal.fire({
            title: 'No puede ser cero!',
            text: 'La cantidad no puede ser menor a 1!',
            icon: 'warning',
        });
        elemento.value = 1;
        return;
    } else {
        carrito[posicion].cantidad = parseInt(elemento.value);
        listarCarrito();
    }
}
function registrarCompra() {
    let proveedor = document.getElementById('proveedor').value;
    let fecha = document.getElementById('fecha').value;
    let comprobante = document.getElementById('numComprobante').value;

    let total = 0;
    carrito.forEach(function (compra) {
        total += compra.subtotal();
    });
    if (proveedor == '' || fecha == '' || comprobante == '' || total == 0) {
        Swal.fire({
            title: 'Faltan datos!',
            text: 'Todos los campos son obligatorios!',
            icon: 'warning',
        });

        return;
    }

    let compra = {
        proveedor: proveedor,
        fecha: fecha,
        comprobante: comprobante,
        total: total,

        usuario: 'Rodrigo Gandarillas',
        detalles: carrito,
    };
    compras.push(compra);
    localStorage.setItem('compras', JSON.stringify(compras));

    //actualizar el stock de los productos
    let losProductos = JSON.parse(localStorage.getItem('productos'));
    for (let i = 0; i < carrito.length; i++) {
        for (let j = 0; j < losProductos.length; j++) {
            if (carrito[i].producto == losProductos[j].nombre) {
                losProductos[j].stock =
                    parseInt(losProductos[j].stock) +
                    parseInt(carrito[i].cantidad);
            }
        }
    }
    localStorage.setItem('productos', JSON.stringify(losProductos));
    window.location.href = 'compras.html';
}
function listarCompras() {
    let lista = document.getElementById('listacompras');
    let html = '';
    compras.forEach(function (compra, index) {
        html += `
        <tr>
            <td>${index + 1}</td>
           
            <td>${compra.proveedor}</td>
            <td>${compra.fecha}</td>
            <td>${compra.comprobante}</td>
            <td>${compra.total}</td>
           
            <td>${compra.usuario}</td>
           
            <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button onclick="verCompra(${index})" class="btn btn-show m5" >
                <i class="fa fa-eye" style="font-size: 16px;"></i>
              </button>
              <button onclick="eliminarCompra(${index})" class="btn btn-delete m5" >
                <i class="fa fa-times" style="font-size: 16px;"></i>
              </button>
            </div>
          </td>

        </tr>
        `;
    });

    if (compras.length == 0) {
        html += `
        <tr>
            <td colspan="7" align="center">
            
            <br>
            <br>
            No hay compras registrados
            <br>
            <br>
            <br>
            <a href="comprasForm.html" class="btn btn-nuevo">
                <i class="fa fa-plus"></i> Nuevo
           </a>
            <br>
            <br>
            <br>
            <br>
            </td>
        </tr>
        `;
    }

    lista.innerHTML = html;
    cargarTotales();
}

function buscarCompra() {
    let buscar = document.getElementById('buscar').value;
    let nuevoArray = [];

    if (buscar.trim() == '' || buscar.trim() == null) {
        nuevoArray = JSON.parse(localStorage.getItem('compras') || []);
    } else {
        for (let i = 0; i < compras.length; i++) {
            let texto = compras[i].proveedor.toLowerCase();
            if (texto.search(buscar.toLowerCase()) >= 0) {
                nuevoArray.push(compras[i]);
            }
        }
    }
    compras = nuevoArray;
    listarCompras();
}

function eliminarCompra(posicion) {
    let compra = compras[posicion];
    let losProductoss = JSON.parse(localStorage.getItem('productos'));
    console.log(compra.detalles);
    console.log(losProductoss);

    Swal.fire({
        title: 'Esta seguro?',
        text: 'La compra se eliminara y se descontara del stock!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            let losProductos = JSON.parse(localStorage.getItem('productos'));
            console.log(losProductos);
            for (let i = 0; i < compra.detalles.length; i++) {
                for (let j = 0; j < losProductos.length; j++) {
                    if (compra.detalles[i].producto == losProductos[j].nombre) {
                        if (
                            parseInt(losProductos[j].stock) >=
                            parseInt(compra.detalles[i].cantidad)
                        ) {
                            losProductos[j].stock =
                                parseInt(losProductos[j].stock) -
                                parseInt(compra.detalles[i].cantidad);
                        } else {
                            Swal.fire({
                                title: 'No se pudo eliminar!',
                                text: 'No hay suficientes productos!',
                                icon: 'error',
                            });
                            return;
                        }
                    }
                }
            }
            localStorage.setItem('productos', JSON.stringify(losProductos));

            compras.splice(posicion, 1);
            localStorage.setItem('compras', JSON.stringify(compras));
            listarCompras();

            Swal.fire({
                title: 'Eliminado!',
                text: 'El producto ha sido eliminada.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
}

function verCompra(posicion) {
    localStorage.setItem('posicionCompra', posicion);

    window.location.href = 'verCompra.html';
}

function mostrarCompra() {
    let posicion = localStorage.getItem('posicionCompra');
    let compra = compras[posicion];

    if (compra == undefined || compra == null) {
        Swal.fire({
            title: 'No se puede mostrar!',
            text: 'No hay compras!',
            icon: 'error',
        }).then((result) => {
            window.location.href = 'compras.html';
        });
    }

    document.getElementById('proveedor').innerText = compra.proveedor;
    document.getElementById('fecha').innerText = compra.fecha;
    document.getElementById('comprobante').innerText = compra.comprobante;
    document.getElementById('total').innerText = compra.total;
    document.getElementById('usuario').innerText = compra.usuario;
    document.getElementById('ltotal').innerText = compra.total;

    let lista = document.getElementById('listadetalle');
    let html = '';
    compra.detalles.forEach(function (detalle) {
        let subtotal =
            parseFloat(detalle.precio) * parseFloat(detalle.cantidad);
        html += `
        <tr>
            <td>${detalle.producto}</td>
            <td>${detalle.precio}</td>
            <td>${detalle.cantidad}</td>
            <td>${subtotal}</td>
        </tr>
        `;
    });

    lista.innerHTML = html;
}

function cargarTotales() {
    let cantidadCompras = 0;
    let comprasMes = 0;
    let totalCompras = 0;

    compras.forEach(function (compra) {
        let fecha = new Date(compra.fecha);

        let fechaActual = new Date();

        if (fecha.getFullYear() == fechaActual.getFullYear()) {
            totalCompras += parseFloat(compra.total);

            if (fecha.getMonth() == fechaActual.getMonth()) {
                comprasMes += parseFloat(compra.total);
            }

            cantidadCompras++;
        }
    });

    document.getElementById('cantidadCompras').innerText = cantidadCompras;
    document.getElementById('comprasMes').innerText = comprasMes;
    document.getElementById('totalCompras').innerText = totalCompras;
}
