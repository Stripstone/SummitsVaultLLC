// script.js

document.addEventListener("DOMContentLoaded", function() {

    // --- FOOTER MODAL LOGIC ---
    document.querySelectorAll(".modal-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const modalId = link.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add("show");
        });
    });

    document.querySelectorAll(".footer-modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".footer-modal").classList.remove("show");
        });
    });

    // Click outside modal content to close
    document.querySelectorAll(".footer-modal").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) modal.classList.remove("show");
        });
    });

    // Close all modals on Escape key
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            document.querySelectorAll(".footer-modal.show").forEach(modal => {
                modal.classList.remove("show");
            });
        }
    });
    
/* DEPRECATED
    // --- CONTACT FORM LOGIC ---
    document.getElementById("contact-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("/.netlify/functions/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });

            if (response.ok) {
            alert("Message sent successfully. Thank you for contacting SummitsVault.");
            e.target.reset();
            } else {
                alert("There was an error sending your message. Please try again later.");
            }
        } catch {
            alert("There was an error sending your message. Please try again later.");
        }
    });
*/
});
