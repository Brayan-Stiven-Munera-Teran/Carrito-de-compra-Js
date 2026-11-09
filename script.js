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
                <div class="card-acciones">
                    <a href="detalle.html?id=${producto.id}">Detalle</a>
                    <button data-id="${producto.id}" class="btnEditar">Editar</button>
                </div>
            </div>
        `;
    });

    let btnsEditar = document.querySelectorAll(".btnEditar");
    btnsEditar.forEach(btnEditar => {
        btnEditar.addEventListener("click", function() {
            consultarYllenar(this.dataset.id);
        });
    });
}

async function consultarYllenar(id) {
    let productoEditar = await productoPorId(id);

    document.getElementById("btnCrear").style.display = "none";
    let button = `<button data-id=${id} id="btnActualizar">Actualizar</button>`;

    let btnActualizar = document.getElementById("btnActualizar");
    if (btnActualizar) {
        btnActualizar.remove();
    }
    document.getElementById("formulario").innerHTML += button;

    document.getElementById("nombre").value = productoEditar.nombre;
    document.getElementById("stock").value = productoEditar.stock;
    document.getElementById("precio").value = productoEditar.precio;

    btnActualizar = document.getElementById("btnActualizar");
    if (btnActualizar) {
        btnActualizar.addEventListener("click", function() {
            actualizarProducto(id);
        });
    }
}

async function actualizarProducto(id) {
    let nombre = document.getElementById("nombre").value;
    let stock = document.getElementById("stock").value;
    let precio = document.getElementById("precio").value;

    let url = "http://localhost:3000/productos/" + id;
    let data = { "nombre": nombre, "stock": stock, "precio": precio };
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
        alert("Producto guardado correctamente");
        pintarProductos();
        document.getElementById("btnCrear").style.display = "block";
        let btnActualizar = document.getElementById("btnActualizar");
        if (btnActualizar) btnActualizar.remove();
        document.getElementById("nombre").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("precio").value = "";
    });
}

pintarProductos();

let btnCrear = document.getElementById("btnCrear");

if (btnCrear) {
    btnCrear.addEventListener("click", function() {
        let nombre = document.getElementById("nombre").value;
        let stock = document.getElementById("stock").value;
        let precio = document.getElementById("precio").value;

        let url = "http://localhost:3000/productos";
        let data = { "nombre": nombre, "stock": stock, "precio": precio };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
            alert("Producto guardado correctamente");
            pintarProductos();
            document.getElementById("nombre").value = "";
            document.getElementById("stock").value = "";
            document.getElementById("precio").value = "";
        });
    });
}
