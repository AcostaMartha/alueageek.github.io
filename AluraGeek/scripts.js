document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-producto');
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const imagenInput = document.getElementById('imagen');
    const enviarBtn = document.getElementById('enviar');
    const limpiarBtn = document.getElementById('limpiar');
    const cuadriculaProductos = document.getElementById('cuadricula-productos');

    function cargarProductos() {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.forEach(producto => {
            crearTarjetaProducto(producto.nombre, producto.precio, producto.imagen);
        });
    }

    function guardarProducto(nombre, precio, imagen) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push({ nombre, precio, imagen });
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function eliminarProducto(nombre) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos = productos.filter(producto => producto.nombre !== nombre);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function crearTarjetaProducto(nombre, precio, imagen) {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('tarjeta-producto');

        const img = document.createElement('img');
        img.src = imagen;
        img.alt = nombre;

        const titulo = document.createElement('h3');
        titulo.textContent = nombre;

        const precioTag = document.createElement('p');
        precioTag.textContent = `$${precio}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn-eliminar');
        botonEliminar.innerHTML = '&#128465;'; // icono de la papelera

        botonEliminar.style.color = 'black';

        botonEliminar.addEventListener('click', function () {
            cuadriculaProductos.removeChild(tarjetaProducto);
            eliminarProducto(nombre);
        });

        tarjetaProducto.appendChild(img);
        tarjetaProducto.appendChild(titulo);
        tarjetaProducto.appendChild(precioTag);
        tarjetaProducto.appendChild(botonEliminar);

        cuadriculaProductos.appendChild(tarjetaProducto);
    }

    enviarBtn.addEventListener('click', function () {
        const nombre = nombreInput.value.trim();
        const precio = precioInput.value.trim();
        const imagen = imagenInput.value.trim();

        if (nombre && precio && imagen) {
            crearTarjetaProducto(nombre, precio, imagen);
            guardarProducto(nombre, precio, imagen);

            // Limpiar los campos del formulario
            formulario.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    limpiarBtn.addEventListener('click', function () {
        formulario.reset();
    });

    // Cargar productos al inicio
    cargarProductos();
});
