// Carga de productos mediante Fetch, Async y Await para renderizar el catálogo en el HTML

// Función asincrónica para obtener los datos de los productos
async function cargarProductos() {
    try {
        var resultado = await fetch("http://localhost:3000/productos");
        if (resultado.ok) {
            return await resultado.json();
        }
    } catch (error) {
        console.warn("Cargando desde products.json");
    }

    var resultadoLocal = await fetch("products.json");
    var datos = await resultadoLocal.json();
    return datos.productos || datos;
}

// Función asincrónica para insertar cada tarjeta de producto en el contenedor
async function pintarProductos() {
    let productos = await cargarProductos();
    let divproductos = document.getElementById("productos");

    divproductos.innerHTML = "";

    // Ciclo para recorrer cada producto y mostrar sus datos en pantalla
    productos.forEach(producto => {
        divproductos.innerHTML += `
            <div class="card-producto">
                <p><strong>ID:</strong> ${producto.id}</p>
                <h3>${producto.nombre}</h3>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
                <button>Comprar</button>
            </div>
        `;
    });
}

// Ejecución de la función principal
pintarProductos();
