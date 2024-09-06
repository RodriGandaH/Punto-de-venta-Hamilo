let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let seleccionado = null;

function registrarCliente() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let documento = document.getElementById('documento').value;
    let tipo = document.getElementById('tipo').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;

    if (
        nombre.trim() == '' ||
        apellidos.trim() == '' ||
        documento.trim() == '' ||
        tipo.trim() == '' ||
        telefono.trim() == '' ||
        correo.trim() == ''
    ) {
        Swal.fire({
            title: 'Faltan datos!',
            text: 'Todos los campos son obligatorios!',
            icon: 'warning',
        });
        return;
    }
    let cliente = {
        nombre: nombre,
        apellidos: apellidos,
        documento: documento,
        tipo: tipo,
        telefono: telefono,
        correo: correo,
    };
    if (seleccionado != null) {
        clientes[seleccionado] = cliente;
    } else {
        clientes.push(cliente);
    }
    localStorage.setItem('clientes', JSON.stringify(clientes));
    window.location.href = 'clientes.html';
}

function listarClientes() {
    let lista = document.getElementById('listaclientes');
    let html = '';
    clientes.forEach(function (cliente, index) {
        html += `
        <tr>
            <td>${index + 1}</td>
           
            <td>${cliente.nombre}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.tipo}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td style="text-align: center;">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button onclick="editarCliente(${index})" class="btn btn-edit m5" >
                <i class="fa fa-edit" style="font-size: 16px;"></i>
              </button>
              <button onclick="eliminarCliente(${index})" class="btn btn-delete m5" >
                <i class="fa fa-times" style="font-size: 16px;"></i>
              </button>
            </div>
          </td>

        </tr>
        `;
    });

    if (clientes.length == 0) {
        html += `
        <tr>
            <td colspan="8" align="center">
            
            <br>
            <br>
            No hay clientes registrados
            <br>
            <br>
            <br>
            <a href="clientesForm.html" class="btn btn-nuevo">
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
function eliminarCliente(posicion) {
    Swal.fire({
        title: 'Esta seguro?',
        text: 'El cliente se eliminará!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            clientes.splice(posicion, 1);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            listarClientes();

            Swal.fire({
                title: 'Eliminado!',
                text: 'El cliente ha sido eliminada.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    });
}

function editarCliente(posicion) {
    localStorage.setItem('cliente_seleccionado', posicion);

    window.location.href = 'clientesForm.html';
}

function setDatos() {
    seleccionado = localStorage.getItem('cliente_seleccionado');

    if (
        seleccionado != null &&
        seleccionado >= 0 &&
        seleccionado != undefined
    ) {
        let cliente = clientes[seleccionado];
        document.getElementById('nombre').value = cliente.nombre;
        document.getElementById('apellidos').value = cliente.apellidos;
        document.getElementById('documento').value = cliente.documento;
        document.getElementById('tipo').value = cliente.tipo;
        document.getElementById('telefono').value = cliente.telefono;
        document.getElementById('correo').value = cliente.correo;
        document.getElementById('tituloFormClientes').innerHTML =
            '<center>Editar Cliente</center>';
        document.getElementById('btn-cliente').innerHTML = 'Actualizar';
    }
}

function buscarCliente() {
    let buscar = document.getElementById('buscar').value;
    let nuevoArray = [];

    if (buscar.trim() == '' || buscar.trim() == null) {
        nuevoArray = JSON.parse(localStorage.getItem('clientes') || []);
    } else {
        for (let i = 0; i < clientes.length; i++) {
            let texto = clientes[i].nombre.toLowerCase();
            if (texto.search(buscar.toLowerCase()) >= 0) {
                nuevoArray.push(clientes[i]);
            }
        }
    }
    clientes = nuevoArray;
    listarClientes();
}
