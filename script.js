// Load balance from localStorage (default: 5000)
let balance = Number(localStorage.getItem("balance")) || 5000;

// Load transaction history
let history = JSON.parse(localStorage.getItem("history")) || [];

// Update balance on screen
updateBalance();
showHistory();

function updateBalance() {
    document.getElementById("balance").innerText = "₹" + balance;
    localStorage.setItem("balance", balance);
}

// Deposit
function deposit() {

    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) {
        showMessage("❌ Please enter a valid amount.");
        return;
    }

    balance += amount;

    updateBalance();

    addHistory("💰 Deposited ₹" + amount);

    showMessage("✅ ₹" + amount + " deposited successfully.");

    document.getElementById("amount").value = "";
}

// Withdraw
function withdraw() {

    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) {
        showMessage("❌ Please enter a valid amount.");
        return;
    }

    if (amount > balance) {
        showMessage("❌ Insufficient Balance.");
        return;
    }

    balance -= amount;

    updateBalance();

    addHistory("💸 Withdrawn ₹" + amount);

    showMessage("✅ ₹" + amount + " withdrawn successfully.");

    document.getElementById("amount").value = "";
}

// Balance enquiry
function checkBalance() {
    showMessage("💳 Current Balance : ₹" + balance);
}

// Message
function showMessage(msg) {
    document.getElementById("message").innerText = msg;
}

// Add transaction
function addHistory(text) {

    let date = new Date();

    let time = date.toLocaleString();

    history.unshift(text + " (" + time + ")");

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("history", JSON.stringify(history));

    showHistory();

}

// Display history
function showHistory() {

    let list = document.getElementById("historyList");

    list.innerHTML = "";

    history.forEach(function(item) {

        let li = document.createElement("li");

        li.innerText = item;

        list.appendChild(li);

    });

}