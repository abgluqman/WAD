// payment.js

// Dummy transaction logic
const paymentForm = document.getElementById('paymentForm');
const paymentMethod = document.getElementById('paymentMethod');
const creditCardDetails = document.getElementById('creditCardDetails');
const digitalWalletDetails = document.getElementById('digitalWalletDetails');
const loyaltyPointsDetails = document.getElementById('loyaltyPointsDetails');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const paymentStatus = document.getElementById('paymentStatus');

// Example values
const subtotal = 50.00;
const taxRate = 0.06;
const tax = subtotal * taxRate;
const total = subtotal + tax;
const digitalWalletBalance = 100.00;
const loyaltyPointsBalance = 500;
const pointsToRMConversion = 100; // 100 pts = RM 1

// Update order summary
subtotalElement.textContent = `RM ${subtotal.toFixed(2)}`;
taxElement.textContent = `RM ${tax.toFixed(2)}`;
totalElement.textContent = `RM ${total.toFixed(2)}`;

// Toggle payment method details
paymentMethod.addEventListener('change', function () {
    creditCardDetails.classList.add('hidden');
    digitalWalletDetails.classList.add('hidden');
    loyaltyPointsDetails.classList.add('hidden');

    if (paymentMethod.value === 'creditCard') {
        creditCardDetails.classList.remove('hidden');
    } else if (paymentMethod.value === 'digitalWallet') {
        digitalWalletDetails.classList.remove('hidden');
    } else if (paymentMethod.value === 'loyaltyPoints') {
        loyaltyPointsDetails.classList.remove('hidden');
    }
});

paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedMethod = paymentMethod.value;

    if (!selectedMethod) {
        paymentStatus.textContent = 'Please select a payment method.';
        paymentStatus.style.color = 'red';
        return;
    }

    if (selectedMethod === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
            paymentStatus.textContent = 'Invalid card number.';
            paymentStatus.style.color = 'red';
            return;
        }

        if (!cardName) {
            paymentStatus.textContent = 'Please enter the cardholder name.';
            paymentStatus.style.color = 'red';
            return;
        }

        if (!expiryDate) {
            paymentStatus.textContent = 'Please enter the expiry date.';
            paymentStatus.style.color = 'red';
            return;
        }

        if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
            paymentStatus.textContent = 'Invalid CVV.';
            paymentStatus.style.color = 'red';
            return;
        }
    } else if (selectedMethod === 'digitalWallet') {
        if (digitalWalletBalance < total) {
            paymentStatus.textContent = 'Insufficient balance in Digital Wallet.';
            paymentStatus.style.color = 'red';
            return;
        }
    } else if (selectedMethod === 'loyaltyPoints') {
        const requiredPoints = total * pointsToRMConversion;
        if (loyaltyPointsBalance < requiredPoints) {
            paymentStatus.textContent = `Insufficient Loyalty Points. You need ${requiredPoints} pts.`;
            paymentStatus.style.color = 'red';
            return;
        }
    }

    // Simulate payment processing
    paymentStatus.textContent = 'Processing payment...';
    paymentStatus.style.color = 'blue';

    setTimeout(() => {
        paymentStatus.textContent = 'Payment successful!';
        paymentStatus.style.color = 'green';
    }, 2000);
});
