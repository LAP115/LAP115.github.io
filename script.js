
document.addEventListener("DOMContentLoaded", () => {
    // Check-In Form Handling
    const checkInForm = document.getElementById("check-in-form");
    checkInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const id = document.getElementById("id").value.trim();
        const stay = document.getElementById("stay").value;
        const gift = document.querySelector("input[name='gift']:checked")?.value;

        if (!name || !id || !stay || !gift) {
            alert("Please fill out all fields.");
            return;
        }

        const guestData = {
            name,
            id,
            stay,
            gift,
            checkInTime: new Date().toLocaleString()
        };

        localStorage.setItem("guestData", JSON.stringify(guestData));
        alert(`✅ Check-in complete! Welcome, ${name}. You chose: ${gift}.`);

        checkInForm.reset();
        displayGuestSummary();
    });

    // Check-Out Form Handling
    const checkOutForm = document.getElementById("check-out-form");
    checkOutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const feedback = document.getElementById("feedback").value.trim();
        if (!feedback) {
            alert("Please leave some feedback.");
            return;
        }

        localStorage.setItem("guestFeedback", feedback);
        alert("💬 Thank you for your feedback!");

        checkOutForm.reset();
        displayFeedback();
    });

    // Display Guest Summary
    function displayGuestSummary() {
        const guestData = JSON.parse(localStorage.getItem("guestData"));
        if (!guestData) return;

        const summaryDiv = document.getElementById("guest-summary");
        summaryDiv.innerHTML = `
            <h3>🧾 Guest Summary</h3>
            <p><strong>Name:</strong> ${guestData.name}</p>
            <p><strong>ID:</strong> ${guestData.id}</p>
            <p><strong>Stay:</strong> ${guestData.stay} night(s)</p>
            <p><strong>Gift:</strong> ${guestData.gift}</p>
            <p><strong>Checked In:</strong> ${guestData.checkInTime}</p>
        `;
    }

    // Display Feedback
    function displayFeedback() {
        const feedback = localStorage.getItem("guestFeedback");
        if (!feedback) return;

        const feedbackDiv = document.getElementById("guest-feedback");
        feedbackDiv.innerHTML = `
            <h3>📝 Guest Feedback</h3>
            <p>"${feedback}"</p>
        `;
    }

    // Load existing data on page load
    displayGuestSummary();
    displayFeedback();
});
