const containerProducts = document.getElementById('container-product')
const addProductButton = document.getElementById('add-product')

const makeProducts = (product) => {
    const {id, title, price, description, category, images} = product

    const cardProduct = document.createElement('div')
    cardProduct.classList.add('card-product')
    cardProduct.id = `product-${id}`

    const containerImgProduct = document.createElement('div')
    containerImgProduct.classList.add('img-card')

    const imgProduct = document.createElement('img')
    imgProduct.src = images[0].replaceAll("[\"", "").replaceAll("\"]", "")
    imgProduct.alt = description

    const titleProduct = document.createElement('h2')
    titleProduct.textContent = title

    const containerDescription = document.createElement('div')
    containerDescription.classList.add('description-card')

    const descriptionProduct = document.createElement('p')
    descriptionProduct.textContent = description

    const priceProduct = document.createElement('p')
    priceProduct.textContent = `$${price}`

    const categoryProduct = document.createElement('p')
    categoryProduct.textContent = category
    categoryProduct.id = `category-${id}`

    const btnAddToCart = document.createElement('button')
    btnAddToCart.textContent = 'Agregar al carrito'
    btnAddToCart.addEventListener('click', () => addProducts(product))

    const btnRemove = document.createElement('button')
    btnRemove.textContent = 'Eliminar producto'
    btnRemove.addEventListener('click', () => removeProduct(id))

    cardProduct.appendChild(containerImgProduct)
    cardProduct.appendChild(containerDescription)

    containerImgProduct.appendChild(imgProduct)

    containerDescription.appendChild(titleProduct)
    containerDescription.appendChild(descriptionProduct)
    containerDescription.appendChild(priceProduct)
    containerDescription.appendChild(categoryProduct)
    containerDescription.appendChild(btnAddToCart)
    containerDescription.appendChild(btnRemove)

    containerProducts.appendChild(cardProduct)
}

function addProducts(product){
    const li = document.createElement('li')
    li.textContent = `${product.title} - $${product.price}`
    li.id = `cart-item-${product.id}`
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Eliminar del carrito'
    removeButton.addEventListener('click', () => {
        document.getElementById('cart-list').removeChild(li)
    })
    document.getElementById('cart-list').appendChild(li)
}

function removeProduct(id) {
    const productElement = document.getElementById(`product-${id}`)
    if (productElement) {
        containerProducts.removeChild(productElement)
    }
}
function fetchProducts() {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => makeProducts(product))
        })
        .catch(error => console.error('Error fetching products:', error))
}

fetchProducts()

addProductButton.addEventListener('click', () => {
    const newProduct = {
        id: Date.now(), 
        title: "Nuevo Producto",
        price: 99.99,
        description: "Descripción del nuevo producto",
        category: "Nueva Categoría",
        image: "https://api.escuelajs.co/api/v1/products/1"
    };
    makeProducts(newProduct)
});
    