

// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Ejercicio 1
function buy(id) {
    // Recorremos todos los productos uno a uno.
    for (let i = 0; i < products.length; i++) {
        let element = products[i]; // Elegimos el producto actual.
        // Si el producto actual tiene el mismo ID que el que queremos comprar...
        if (element.id == id) {
            cartList.push(element) // ...lo metemos en el carrito.
        }
    }
    // Luego de agregar el producto, generamos la lista del carrito, aplicamos las promociones y calculamos el total.
    generateCart()
    applyPromotionsCart()
    calculateTotal()
}

// Ejercicio 2
function cleanCart() {
    // Eliminamos todos los elementos del carrito.
    cart.splice(0, cart.length)
    // Luego de limpiarlo, recalculamos el total y mostramos el carrito vacío.
    calculateTotal()
    printCart()
}

// Ejercicio 3
function calculateTotal() {
    // Empezamos con total igual a 0.
    total = 0;
    // Recorremos todos los productos del carrito uno a uno.
    cart.forEach(element => {
        // Si el producto no tiene descuento, sumamos el precio por su cantidad al total.
        if (element.subtotalWithDiscount === undefined) {
            total += element.quantity * element.price;
        } else {
            // Si tiene descuento, sumamos el subtotal con descuento al total.
            total += element.subtotalWithDiscount
        }
    });
    // Actualizamos el total en el HTML con dos decimales.
    document.getElementById("total_price").innerHTML = total.toFixed(2)
    printCart()
}

// Ejercicio 4
function generateCart() {
    // Empezamos con el carrito vacío.
    cart = [];
    // Recorremos todos los productos.
    cartList.forEach(element => {
        // Buscamos si el producto ya se encuentra en el carrito.
        let found = cart.find(e => e.id === element.id)
        // Si el producto ya se encuentra, incrementamos su cantidad.
        if (found) {
            found.quantity++
        } else {
            // Si el producto no se encuentra, lo agregamos con cantidad 1.
            let newObject = { ...element, quantity: 1 };
            cart.push(newObject)
        }
    });
}

// Ejercicio 5
function applyPromotionsCart() {
    cart.forEach(element => {
        // Si el producto es el de ID 1 y su cantidad es 3 o más, aplicamos un descuento.
        if (element.id === 1 && element.quantity >= 3) {
            element.price = 10;
            element.subtotalWithDiscount = element.price * element.quantity;
        } else if (element.id === 3 && element.quantity >= 10) {
            // Si el producto es el de ID 3 y su cantidad es 10 o más, aplicamos otro descuento.
            element.price = 10.5;
            element.subtotalWithDiscount = ((element.price * element.quantity) / 3) * 2;
            
        } else {
            // Si el producto no tiene descuentos, el subtotal con descuento es igual al precio por la cantidad.
            element.price = 10.5;
            element.subtotalWithDiscount = element.price * element.quantity
        }
    });
    calculateTotal()
}

// Ejercicio 6
function printCart() {
    // Rellena el modal manipulando el DOM.
    const carrito = document.getElementById("cart_list")
    carrito.innerHTML = ""
    cart.forEach(element => {
        if (element.quantity === 0) {
            carrito.innerHTML +=""
        }else{
        carrito.innerHTML +=
            `<tr>
            <th scope="row">${element.name}</th>
            <td>$${element.price.toFixed(2)}</td>
            <td>${element.quantity}</td>
            <td>$${element.subtotalWithDiscount.toFixed(2)}</td>
            <button onclick="removeFromCart(${element.id})">basura</button>
            </tr>`
        }
    });
    numeroCarrito()
}



// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactorizar el código previo para simplificarlo
    // 1. Bucle for para recorrer el array de productos y obtener el producto a añadir al carrito
        // 2. Añadir el producto encontrado al array del carrito o actualizar su cantidad en caso de que se haya Find previamente.
    let primer_producto = products.find(e => e.id === id)
    if(primer_producto){
        let producto_añadido = cart.find(e => e.id === primer_producto.id)
        if (producto_añadido){
            producto_añadido.quantity++

        } else {
        primer_producto.quantity = 1
        cart.push(primer_producto)
        }
    } else{
        console.log("Producto no encontrado")
    }
    applyPromotionsCart()
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let eliminar_producto = cart.find(e => e.id === id)
    eliminar_producto.quantity--;
    if (eliminar_producto) {
        if (eliminar_producto.quantity === 0) {
            cart.pop(eliminar_producto)
        }
    }
    applyPromotionsCart()
}

function open_modal() {
    console.log("Open Modal");
    calculateTotal()
}

// Sé que podría haberlo integrado en alguna funcion ya existente pero he pensado que era de buenas practicas separar funciones mas pequeñas para reutilizar codigo 
function numeroCarrito() {
    debugger
    let  countProduct = document.getElementById("count_product")
    let productoCantidad = 0
    cart.forEach(element => {
        productoCantidad += element.quantity
       
        if (cart == []) {
            productoCantidad = 0
        }
    });
    countProduct.innerHTML = productoCantidad
}