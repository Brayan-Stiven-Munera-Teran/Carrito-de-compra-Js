async function cargarProductos() {
    try {
        let resultado = await fetch("http://localhost:3000/productos");
        if (resultado.ok) {
            return await resultado.json();
        }
    } catch (error) {
        console.warn("Cargando desde products.json");
    }

    let resultadoLocal = await fetch("products.json");
    let datos = await resultadoLocal.json();
    return datos.productos || datos;
}

async function productoPorId(id) {
    try {
        let api = "http://localhost:3000/productos/" + id;
        let resultado = await fetch(api);
        if (resultado.ok) {
            return await resultado.json();
        }
    } catch (error) {
        console.warn("Buscando en products.json");
    }

    let productos = await cargarProductos();
    return productos.find(producto => producto.id == id);
}

async function pintarProductos() {
    let divProductos = document.getElementById("productos");
    if (!divProductos) return;

    let productos = await cargarProductos();
    divProductos.innerHTML = "";

    productos.forEach(producto => {
        divProductos.innerHTML += `
            <div class="card-producto">
                <p><strong>ID:</strong> ${producto.id}</p>
                <h3>${producto.nombre}</h3>
                <a href="detalle.html?id=${producto.id}">Detalle</a>
            </div>
        `;
    });
}

pintarProductos();
