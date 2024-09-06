let productos = JSON.parse(localStorage.getItem('productos')) || [];
let seleccionado = null;

function registrarProducto() {
    let nombre = document.getElementById('producto').value;
    let precio = document.getElementById('precio').value;
    let stock = document.getElementById('stock').value;

    if (nombre.trim() == '' || precio.trim() == '' || stock.trim() == '') {
        Swal.fire({
            title: 'Faltan datos!',
            text: 'Todos los campos son obligatorios!',
            icon: 'warning',
        });
        return;
    }
    let producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
    };
    if (seleccionado != null) {
        productos[seleccionado] = producto;
    } else {
        productos.push(producto);
    }
    localStorage.setItem('productos', JSON.stringify(productos));
    window.location.href = 'productos.html';
}

function listarProductos() {
    let lista = document.getElementById('listaproductos');
    let html = '';
    productos.forEach(function (producto, index) {
        html += `
        <tr>
            <td>${index + 1}</td>
           
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
           
            <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button onclick="editarProducto(${index})" class="btn btn-edit m5" >
                <i class="fa fa-edit" style="font-size: 16px;"></i>
              </button>
              <button onclick="eliminarProducto(${index})" class="btn btn-delete m5" >
                <i class="fa fa-times" style="font-size: 16px;"></i>
              </button>
            </div>
          </td>

        </tr>
        `;
    });

    if (productos.length == 0) {
        html += `
        <tr>
            <td colspan="8" align="center">
            
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
function eliminarProducto(posicion) {
    Swal.fire({
        title: 'Esta seguro?',
        text: 'El producto se eliminará!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem('productos', JSON.stringify(productos));
            listarProductos();

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

function editarProducto(posicion) {
    localStorage.setItem('producto_seleccionado', posicion);

    window.location.href = 'productosForm.html';
}

function setDatos() {
    seleccionado = localStorage.getItem('producto_seleccionado');

    if (
        seleccionado != null &&
        seleccionado >= 0 &&
        seleccionado != undefined
    ) {
        let producto = productos[seleccionado];
        document.getElementById('producto').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('tituloFormProductos').innerHTML =
            '<center>Editar producto</center>';
        document.getElementById('btn-producto').innerHTML = 'Actualizar';
    }
}

function buscarProducto() {
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
