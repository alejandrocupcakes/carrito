const containerProducts = document.getElementById('container-product');
const addProductButton = document.getElementById('add-product');
const cartIcon = document.getElementById('cart-icon');
const cartMenu = document.getElementById('cart-menu');
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');
const clearCartButton = document.getElementById('clear-cart');

let cart = {};

const makeProducts = (product) => {
    const {id, title, price, description, category, images} = product;

    const cardProduct = document.createElement('div');
    cardProduct.classList.add('card-product');
    cardProduct.id = `product-${id}`;

    const containerImgProduct = document.createElement('div');
    containerImgProduct.classList.add('img-card');

    const imgProduct = document.createElement('img');
    imgProduct.src = images[0].replaceAll("[\"", "").replaceAll("\"]", "");
    imgProduct.alt = description;

    const titleProduct = document.createElement('h2');
    titleProduct.textContent = title;

    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-card');

    const descriptionProduct = document.createElement('p');
    descriptionProduct.textContent = description;

    const priceProduct = document.createElement('p');
    priceProduct.textContent = `$${price}`;

    const categoryProduct = document.createElement('p');
    categoryProduct.textContent = category;
    categoryProduct.id = `category-${id}`;

    const btnAddToCart = document.createElement('button');
    btnAddToCart.textContent = 'Agregar';
    btnAddToCart.addEventListener('click', () => addToCart(product));

    cardProduct.appendChild(containerImgProduct);
    cardProduct.appendChild(containerDescription);

    containerImgProduct.appendChild(imgProduct);

    containerDescription.appendChild(titleProduct);
    containerDescription.appendChild(descriptionProduct);
    containerDescription.appendChild(priceProduct);
    containerDescription.appendChild(categoryProduct);
    containerDescription.appendChild(btnAddToCart);

    containerProducts.appendChild(cardProduct);
};

function addToCart(product) {
    if (cart[product.id]) {
        cart[product.id].quantity++;
    } else {
        cart[product.id] = { ...product, quantity: 1 };
    }
    updateCartUI();
}

function updateCartUI() {
    cartList.innerHTML = '';
    let totalItems = 0;
    
    for (const id in cart) {
        const item = cart[id];
        totalItems += item.quantity;
        
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.title} - $${item.price} x ${item.quantity}
            <button class="add-one" data-id="${id}">+</button>
            <button class="remove-one" data-id="${id}">-</button>
        `;
        cartList.appendChild(li);
    }
    
    cartCount.textContent = totalItems;
}

cartList.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('add-one')) {
        cart[id].quantity++;
    } else if (e.target.classList.contains('remove-one')) {
        cart[id].quantity--;
        if (cart[id].quantity === 0) {
            delete cart[id];
        }
    }
    updateCartUI();
});

clearCartButton.addEventListener('click', () => {
    cart = {};
    updateCartUI();
});

cartIcon.addEventListener('click', () => {
    cartMenu.classList.toggle('hidden');
});

function fetchProducts() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
            products.slice(0, 10).forEach(product => makeProducts(product));
        })
        .catch(error => console.error('Error fetching products:', error));
}

fetchProducts();

addProductButton.addEventListener('click', () => {
    const newProduct = {
        id: Date.now(), 
        title: "Nuevo Producto",
        price: 99.99,
        description: "Descripción del nuevo producto",
        category: "Nueva Categoría",
        images: ["https://api.escuelajs.co/api/v1/products/1"]
    };
    makeProducts(newProduct);
});

