let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
let seleccionado = null;

function registrarProveedor() {
    let empresa = document.getElementById('empresa').value;
    let contacto = document.getElementById('contacto').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;
    let direccion = document.getElementById('direccion').value;

    if (
        empresa.trim() == '' ||
        contacto.trim() == '' ||
        telefono.trim() == '' ||
        correo.trim() == '' ||
        direccion.trim() == ''
    ) {
        Swal.fire({
            title: 'Faltan datos!',
            text: 'Todos los campos son obligatorios!',
            icon: 'warning',
        });
        return;
    }
    let proveedor = {
        empresa: empresa,
        contacto: contacto,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
    };
    if (seleccionado != null) {
        proveedores[seleccionado] = proveedor;
    } else {
        proveedores.push(proveedor);
    }
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
    window.location.href = 'proveedores.html';
}

function listarProveedores() {
    let lista = document.getElementById('listaProveedores');
    let html = '';
    proveedores.forEach(function (proveedor, index) {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${proveedor.empresa}</td>
            <td>${proveedor.contacto}</td>
            <td>${proveedor.telefono}</td>
            <td>${proveedor.correo}</td>
            <td>${proveedor.direccion}</td>
            <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button onclick="editarProveedor(${index})" class="btn btn-edit m5" >
                <i class="fa fa-edit" style="font-size: 16px;"></i>
              </button>
              <button onclick="eliminarProveedor(${index})" class="btn btn-delete m5" >
                <i class="fa fa-times" style="font-size: 16px;"></i>
              </button>
            </div>
          </td>

        </tr>
        `;
    });

    if (proveedores.length == 0) {
        html += `
        <tr>
            <td colspan="7" align="center">
            
            <br>
            <br>
            No hay proveedores registrados
            <br>
            <br>
            <br>
            <a href="proveedoresForm.html" class="btn btn-nuevo">
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
function eliminarProveedor(posicion) {
    Swal.fire({
        title: 'Esta seguro?',
        text: 'El proveedor se eliminará!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            proveedores.splice(posicion, 1);
            localStorage.setItem('proveedores', JSON.stringify(proveedores));
            listarProveedores();

            Swal.fire({
                title: 'Eliminado!',
                text: 'El proveedor ha sido eliminada.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
}

function editarProveedor(posicion) {
    localStorage.setItem('proveedor_seleccionado', posicion);

    window.location.href = 'proveedoresForm.html';
}

function setDatos() {
    seleccionado = localStorage.getItem('proveedor_seleccionado');

    if (
        seleccionado != null &&
        seleccionado >= 0 &&
        seleccionado != undefined
    ) {
        let proveedor = proveedores[seleccionado];
        document.getElementById('empresa').value = proveedor.empresa;
        document.getElementById('contacto').value = proveedor.contacto;
        document.getElementById('telefono').value = proveedor.telefono;
        document.getElementById('correo').value = proveedor.correo;
        document.getElementById('direccion').value = proveedor.direccion;
        document.getElementById('tituloFormProveedores').innerHTML =
            '<center>Editar Proveedor</center>';
        document.getElementById('btn-proveedor').innerHTML = 'Actualizar';
    }
}

function buscarProveedor() {
    let buscar = document.getElementById('buscar').value;
    let nuevoArray = [];

    if (buscar.trim() == '' || buscar.trim() == null) {
        nuevoArray = JSON.parse(localStorage.getItem('proveedores') || []);
    } else {
        for (let i = 0; i < proveedores.length; i++) {
            let texto = proveedores[i].empresa.toLowerCase();
            if (texto.search(buscar.toLowerCase()) >= 0) {
                nuevoArray.push(proveedores[i]);
            }
        }
    }
    proveedores = nuevoArray;
    listarProveedores();
}
