var typed = new Typed('.typing', {
    strings: ["I am Jyotish Bishwakarma."],
    typeSpeed: 80,
    backSpeed: 30,
    loop: true
});

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new URLSearchParams(new FormData(this)); // Convert FormData to URL-encoded format
    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData,
        });

        const data = await response.json();
        responseMessage.innerHTML = `<div class="alert ${response.ok ? 'alert-success' : 'alert-danger'}">${data.message || data.error}</div>`;

        if (response.ok) this.reset();
    } catch (error) {
        responseMessage.innerHTML = `<div class="alert alert-danger">Error sending message.</div>`;
    }
});

