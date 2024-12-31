// Show Categories (Food, Drink, All)
function showCategory(categoryId) {
    const foodSection = document.getElementById('food-section');
    const drinkSection = document.getElementById('drink-section');

    if (categoryId === 'food-section') {
        foodSection.style.display = 'block';
        drinkSection.style.display = 'none';
    } else if (categoryId === 'drink-section') {
        drinkSection.style.display = 'block';
        foodSection.style.display = 'none';
    } else {
        // Show all sections
        foodSection.style.display = 'block';
        drinkSection.style.display = 'block';
    }
}

// Food Slideshow
const imagesfood = [ "foodpic/foodslide1.jpeg","foodpic/foodslide2.jpeg","foodpic/foodslide3.jpeg",
    "foodpic/foodslide4.jpeg","foodpic/foodslide5.jpeg"];
// Drink Slideshow
const imagesdrink = ["foodpic/drinkslide1.jpeg","foodpic/drinkslide2.jpeg","foodpic/drinkslide3.jpeg",
    "foodpic/drinkslide4.jpeg"];

let foodIndex = 0;
let drinkIndex = 0;

function changeFoodImage() {
    const imgElement = document.getElementById("slideshow1");
    if (imgElement) {
        foodIndex = (foodIndex + 1) % imagesfood.length; // Loop back to first image
        imgElement.src = imagesfood[foodIndex];
    }
}

function changeDrinkImage() {
    const imgElement = document.getElementById("slideshow2");
    if (imgElement) {
        drinkIndex = (drinkIndex + 1) % imagesdrink.length; // Loop back to first image
        imgElement.src = imagesdrink[drinkIndex];
    }
}

// Change image every certain seconds
setInterval(changeFoodImage, 2300);
setInterval(changeDrinkImage, 2500);



// Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Clear the cart stored in sessionStorage on page load
    sessionStorage.removeItem('cart'); 
    console.log('Cart cleared on page refresh.');

    let cart = []; // Initialize an empty cart

    // Function to render the cart items and total price
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        const cartCountElement = document.getElementById('cart-count');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        // Clear the cart container
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            totalPriceElement.textContent = 'Total: RM 0.00';
            cartCountElement.textContent = '0';
            return;
        }

        emptyCartMessage.style.display = 'none';

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - RM ${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `Total: RM ${total.toFixed(2)}`;
        cartCountElement.textContent = cart.length.toString();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            cart.push({ name, price });
            sessionStorage.setItem('cart', JSON.stringify(cart));

            renderCart();
            alert(`${name} has been added to the cart!`);
        });
    });

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Cart dropdown
    document.getElementById('cart-button').addEventListener('click', () => {
        const cartDropdown = document.getElementById('cart-dropdown');
        cartDropdown.classList.toggle('hidden');
    });

    renderCart();
});


// Checkout Button Event Listener
document.getElementById('checkout-button').addEventListener('click', () => {
    // Clear the cart and navigate to checkout page
    localStorage.removeItem('cart');
    sessionStorage.removeItem('cart');
    window.location.href = 'checkout.html';
});


// Populate Order Summary on Checkout Page
if (window.location.pathname.includes('checkout.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Read cart from localStorage or initialize as empty
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Ensure it doesn't default to any stale data
        const orderSummary = document.getElementById('order-summary');

        // Clear previous contents
        orderSummary.innerHTML = '';

        if (cart.length === 0) {
            orderSummary.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let total = 0;

        // Render cart items in the order summary
        cart.forEach(item => {
            total += item.price;

            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <span>${item.name} - RM ${item.price.toFixed(2)}</span>
            `;
            orderSummary.appendChild(itemElement);
        });

        const totalElement = document.createElement('p');
        totalElement.className = 'order-total';
        totalElement.textContent = `Total: RM ${total.toFixed(2)}`;
        orderSummary.appendChild(totalElement);
    });
}

