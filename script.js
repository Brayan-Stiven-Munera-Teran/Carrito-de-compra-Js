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

async function pintarProductos() {
    let productos = await cargarProductos();
    let divproductos = document.getElementById("productos");

    divproductos.innerHTML = "";

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

pintarProductos();

