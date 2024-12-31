function navigateTo(page) {
  // Navigate to the specified page
  window.location.href = page;
}

function updateStatus(button, status) {
    const orderCard = button.closest('.order-card');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'order-status';
    statusDiv.textContent = status.toUpperCase();
  
    if (status === 'Rejected') {
      statusDiv.style.color = '#e53935';
    } else if (status === 'Complete') {
      statusDiv.style.color = '#43a047';
    }
  
    // Remove buttons and show status
    const actions = orderCard.querySelector('.order-actions');
    actions.replaceWith(statusDiv);
  }
  
  function filterOrders(filterId) {
    const orders = document.querySelectorAll('.order-card');
    orders.forEach((order) => {
      if (filterId === 'all' || order.dataset.id === filterId) {
        order.style.display = 'block';
      } else {
        order.style.display = 'none';
      }
    });
  }
  