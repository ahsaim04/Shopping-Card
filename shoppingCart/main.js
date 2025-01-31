import "./style.css";
import { getCart,setCart} from "./utl";

async function getProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products; // Return the products array
}


function initializeState(){
    //initialize cart
    const cart = getCart();
    if (!cart) {
        const initialCart ={
            items: [],
            discount: 0,
            shipping: 100,
        };
        setCart(initialCart);
    }else{
        document.querySelector('.cart-total-items').innerHTML = cart.items.length;
    }

    
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
        const cart = getCart();
        const productinCart= cart.items.find((item) => item.id === product.id);
        if(!productinCart)
        {
            
        cart.items.push(
            {
                id: product.id,
                price: product.price,
                title: product.title,
                description: product.description,
                thumbnail: product.thumbnail,
                quantity: 1,
            }
        );}
        else{
            cart.items = cart.items.map((item) => {
                if(item.id !== product.id){
                    return item;
                }
              item.quantity =item.quantity + 1;
              return item;
            });       
        
        }
  

        document.querySelector('.cart-total-items').innerHTML = cart.items.length;
        setCart(cart);
 
    });
    div.querySelector(".card-actions").appendChild(button);
    
    return div;
}

async function renderProducts() {
    const products = await getProducts();
    const productsDiv = document.querySelector(".products");

      products.forEach(product => {
        productsDiv.append(getProductCard(product));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    initializeState();
});

   

