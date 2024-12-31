function navigateTo(page) {
    // Navigate to the specified page
    window.location.href = page;
}

// Menu Items Array
let menuItems = [
    { name: "Sup Tomyam Campur", price: 7.0, image: "foodpic/tomyam.jpeg", category: "Foods" },
    { name: "Nasi Lemak", price: 5.0, image: "foodpic/nasi lemak.jpg", category: "Foods" },
    { name: "Sup Ayam", price: 6.0, image: "foodpic/sup.jpeg", category: "Foods" },
    { name: "Nasi Goreng", price: 4.0, image: "foodpic/nasigoreng.jpg", category: "Foods" },
    { name: "Mee Goreng", price: 5.0, image: "foodpic/meegoreng.jpg", category: "Foods" },
    { name: "Kuey Teow Goreng", price: 5.0, image: "foodpic/kueyteowgoreng.jpeg", category: "Foods" },
    { name: "Maggie Goreng", price: 4.0, image: "foodpic/maggiegoreng.jpeg", category: "Foods" },
    { name: "Mee Sup", price: 6.0, image: "foodpic/meesup.jpeg", category: "Foods" },
    { name: "Nasi Goreng Pattaya", price: 5.0, image: "foodpic/nasigorengpattaya.jpeg", category: "Foods" },
    { name: "Nasi Goreng Ayam", price: 5.0, image: "foodpic/nasigorengayam.jpeg", category: "Foods" },
    { name: "Teh O Ais", price: 1.5, image: "foodpic/TehO.jpeg", category: "Drinks" },
    { name: "Kopi O Ais", price:1.5, image: "foodpic/KopiO.jpeg", category: "Drinks" },
    { name: "Teh C Ais", price: 3.5, image: "foodpic/TehC.jpeg", category: "Drinks" },
    { name: "Teh Tarik Panas", price: 3.0, image: "foodpic/TehTarik.jpeg", category: "Drinks" },
    { name: "Green Tea Susu", price: 4.0, image: "foodpic/greenteasusu.jpeg", category: "Drinks" },
    { name: "Teh Ais Limau", price: 3.0, image: "foodpic/aislemontea.jpeg", category: "Drinks" },
    { name: "Bandung Ais", price: 3.0, image: "foodpic/airbandung.jpeg", category: "Drinks" },
    { name: "Lemon Panas", price: 2.5, image: "foodpic/hotlemon.jpeg", category: "Drinks" },
    { name: "Jus Tembikai", price: 4.0, image: "foodpic/justembikai.jpeg", category: "Drinks" },
    { name: "Laici Susu", price: 4.0, image: "foodpic/laicisusu.jpeg", category: "Drinks" },
];

let currentCategory = "Foods";

// Display Menu
function displayMenu() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    const filteredItems = menuItems.filter(item => item.category === currentCategory);

    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">RM ${item.price.toFixed(2)}</p>
            <button onclick="editMenuItem(${index})">Edit</button>
            <button onclick="deleteMenuItem(${index})">Delete</button>
        `;
        container.appendChild(menuItem);
    });
}

// Add or Update Menu Item
let editIndex = null;

document.getElementById("menu-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("food-name").value;
    const price = parseFloat(document.getElementById("food-price").value);
    const image = document.getElementById("food-image").value;
    const category = document.getElementById("food-category").value;

    if (editIndex !== null) {
        menuItems[editIndex] = { name, price, image, category };
        editIndex = null;
    } else {
        menuItems.push({ name, price, image, category });
    }

    displayMenu();
    this.reset();
});

// Edit Menu Item
function editMenuItem(index) {
    const item = menuItems[index];
    document.getElementById("food-name").value = item.name;
    document.getElementById("food-price").value = item.price;
    document.getElementById("food-image").value = item.image;
    document.getElementById("food-category").value = item.category;
    editIndex = index;
}

// Delete Menu Item
function deleteMenuItem(index) {
    if (confirm("Are you sure you want to delete this menu item?")) {
        menuItems.splice(index, 1);
        displayMenu();
    }
}

// Switch Category
function switchCategory(category) {
    currentCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelector(`button[onclick="switchCategory('${category}')"]`).classList.add("active");

    displayMenu();
}

// Initial Display
displayMenu();
