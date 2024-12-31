function navigateTo(page) {
    // Navigate to the specified page
    window.location.href = page;
}

// Sample Orders Data
let orders = [
    {
        id: "#0001",
        username: "John Doe",
        email: "johndoe@gmail.com",
        date: "08 Feb 2024",
        price: 8.0,
        status: "Pending",
        items: [
            { name: "Teh Tarik Panas", price: 3.0, quantity: 1 },
            { name: "Mee Goreng", price: 5.0, quantity: 1 }
        ]
    },
    {
        id: "#0002",
        username: "Jane Smith",
        email: "janesmith@gmail.com",
        date: "08 Feb 2024",
        price: 8.5,
        status: "Completed",
        items: [
            { name: "Nasi Lemak", price: 5.0, quantity: 1 },
            { name: "Teh Ais Limau", price: 3.0, quantity: 1 }
        ]
    }
];

// Display Orders
function displayOrders() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    orders.forEach((order, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.username}</td>
            <td>${order.email}</td>
            <td>${order.date}</td>
            <td>RM ${order.price.toFixed(2)}</td>
            <td>${order.status}</td>
            <td>
                <button class="action-btn" onclick="viewOrderDetails(${index})">View</button>
                <button class="action-btn" onclick="generatePDF(${index})">Generate PDF</button>
            </td>
        `;
        orderList.appendChild(row);
    });
}

//Generate PDF
const { jsPDF } = window.jspdf;

function generatePDF(index) {
    const order = orders[index];
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Order Summary", 20, 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Order ID: ${order.id}`, 20, 40);
    pdf.text(`Username: ${order.username}`, 20, 50);
    pdf.text(`Email: ${order.email}`, 20, 60);
    pdf.text(`Date: ${order.date}`, 20, 70);
    pdf.text(`Price: RM ${order.price}`, 20, 80);
    pdf.text(`Status: ${order.status}`, 20, 90);

    pdf.save(`${order.id}_OrderSummary.pdf`);
}

// Show Order Details in Modal
function viewOrderDetails(index) {
    const order = orders[index];
    const modal = document.getElementById("order-modal");
    const orderDetails = document.getElementById("order-details");

    // Populate modal content
    orderDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Username:</strong> ${order.username}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Price:</strong> RM ${order.price.toFixed(2)}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Items:</strong></p>
        <ul>
            ${order.items
                .map(item => `<li>${item.name} (x${item.quantity}) - RM${item.price}</li>`)
                .join("")}
        </ul>
    `;

    // Show modal
    modal.style.display = "block";
}

// Close Modal
function closeModal() {
    const modal = document.getElementById("order-modal");
    modal.style.display = "none";
}

// Initial Display
displayOrders();
