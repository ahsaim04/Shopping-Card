import "./style.css";

async function getProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products; // Return the products array
}

function getProductCard(product) {
    const div = document.createElement('div');
    div.className = "card card-compact bg-base-100 shadow-xl relative";
    div.innerHTML = `
        <figure>
            <img src="${product.thumbnail}" alt="${product.title}" />
        </figure>
            <div  class="absolute top-0 right-0 bg-primary text-white w-12 h-14 pt-2 text-center font-semibold rounded-tr-2xl rounded-bl-2xl text-sm">${product.discountPercentage}25% OFF</div>
        <div class="card-body">
            <h2 class="card-title">${product.title}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <div class="card-actions justify-end"></div>
        </div>
    `;

    const button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.className = "btn btn-sm btn-primary";
    
    button.addEventListener("click", () => {
        alert("Added to Cart");
        console.log(product);
    });

    div.querySelector(".card-actions").appendChild(button);
    
    return div;
}

async function renderProducts() {
    const products = await getProducts();
    const productsDiv = document.querySelector(".products");
    //initialize cart
    const value = localStorage.getItem("cart")
    if (!value) {
        const initialCart ={
            items: [],
            discount: 0,
            shipping: 100,
        };
    }

    
    // Clear products div before rendering (useful for debugging)
    productsDiv.innerHTML = '';

    products.forEach(product => {
        productsDiv.append(getProductCard(product));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});
