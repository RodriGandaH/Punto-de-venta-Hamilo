// Inicializar las variables de compras y ventas desde localStorage
var compras = JSON.parse(localStorage.getItem('compras')) || [];
var ventas = JSON.parse(localStorage.getItem('ventas')) || [];
var meses = [
    'Enero',
    'Febreo',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];
// Función para cargar los totales
function cargarTotales() {
    var comprasMes = 0;
    var totalCompras = 0;
    var ventasMes = 0;
    var totalVentas = 0;
    var fechaActual = new Date();

    // Para compras
    for (let i = 0; i < compras.length; i++) {
        var laFecha = new Date(compras[i].fecha);
        if (laFecha.getFullYear() === fechaActual.getFullYear()) {
            totalCompras += parseFloat(compras[i].total);
            if (laFecha.getMonth() === fechaActual.getMonth()) {
                comprasMes += parseFloat(compras[i].total);
            }
        }
    }

    document.getElementById('comprasMes').innerText = comprasMes;
    document.getElementById('totalCompras').innerText = totalCompras;

    // Para ventas
    for (let i = 0; i < ventas.length; i++) {
        var laFecha = new Date(ventas[i].fecha);
        if (laFecha.getFullYear() === fechaActual.getFullYear()) {
            totalVentas +=
                parseFloat(ventas[i].total) - parseFloat(ventas[i].descuento);
            if (laFecha.getMonth() === fechaActual.getMonth()) {
                ventasMes +=
                    parseFloat(ventas[i].total) -
                    parseFloat(ventas[i].descuento);
            }
        }
    }

    document.getElementById('ventasMes').innerText = ventasMes;
    document.getElementById('totalVentas').innerText = totalVentas;
}

// Llama a la función para cargar los totales
cargarTotales();

function graficoVentas() {
    var ventasArray = [];
    var comprasArray = [];

    // Suponiendo que tienes un arreglo 'meses' con los nombres de los meses
    for (let i = 0; i < meses.length; i++) {
        ventasArray[i] = 0;
        comprasArray[i] = 0;

        for (let j = 0; j < ventas.length; j++) {
            var fecha = new Date(ventas[j].fecha);
            if (fecha.getMonth() === i) {
                ventasArray[i] +=
                    parseFloat(ventas[j].total) -
                    parseFloat(ventas[j].descuento);
            }
        }

        for (let j = 0; j < compras.length; j++) {
            var fecha = new Date(compras[j].fecha);
            if (fecha.getMonth() === i) {
                comprasArray[i] += parseFloat(compras[j].total);
            }
        }
    }

    var options = {
        chart: {
            type: 'area',
        },
        series: [
            {
                name: 'Ventas',
                data: ventasArray,
            },
            {
                name: 'Compras',
                data: comprasArray,
            },
        ],
        xaxis: {
            categories: meses,
        },
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
}

// Llama a la función para crear el gráfico
graficoVentas();

function graficoProductos() {
    // Inicializar arreglos
    var arrayProductos = [];
    var arrayCantidades = [];

    // Obtener datos de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Recorrer productos y llenar los arreglos
    for (let i = 0; i < productos.length; i++) {
        arrayProductos[i] = productos[i].nombre;
        arrayCantidades[i] = 0;

        // Recorrer ventas y detalles
        for (let v = 0; v < ventas.length; v++) {
            var detalles = ventas[v].detalles;
            for (let vd = 0; vd < detalles.length; vd++) {
                if (productos[i].nombre === detalles[vd].producto) {
                    arrayCantidades[i] += parseFloat(detalles[vd].cantidad);
                }
            }
        }
    }

    // Crear opciones para el gráfico de donas
    var opciones = {
        series: arrayCantidades,
        labels: arrayProductos,
        chart: {
            type: 'donut',
        },
    };

    // Crear el gráfico
    var grafico = new ApexCharts(
        document.querySelector('#chart-productos'),
        opciones
    );
    grafico.render();
}

// Llamar a la función para crear el gráfico
graficoProductos();
