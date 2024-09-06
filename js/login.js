function login() {
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;

    if (usuario === 'admin' && contrasena === 'admin123') {
        localStorage.setItem('sesion', 'si');
        Swal.fire({
            title: 'Bienvenido!',
            text: 'Has iniciado sesión!!!!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
        }).then(() => {
            window.location.href = 'index.html';
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Las credenciales no son válidas!!!!',
            icon: 'error',
        }).then(() => {
            localStorage.removeItem('sesion');
            window.location.href = 'login.html';
        });
    }
}

function verificar() {
    if (localStorage.getItem('sesion') === 'si') {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'login.html';
    }
}

function logout() {
    Swal.fire({
        title: 'Está seguro?',
        text: 'Saldrá de la sesión!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero salir!',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('sesion');
            window.location.href = 'login.html';
        }
    });
}
