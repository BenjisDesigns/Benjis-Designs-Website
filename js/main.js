(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");

  if (contactForm && formStatus && submitBtn) {
    const defaultBtnText = submitBtn.textContent;

    function showStatus(message, type) {
      formStatus.textContent = message;
      formStatus.hidden = false;
      formStatus.className = "form-status form-status--" + type;
    }

    function clearStatus() {
      formStatus.hidden = true;
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      clearStatus();

      const config = window.CONTACT_FORM || {};
      const recipient = (config.recipient || "").trim();

      if (!recipient || recipient.includes("your@") || recipient.includes("[your")) {
        showStatus(
          "Set your email in js/contact-config.js (recipient) so messages can be delivered.",
          "error"
        );
        return;
      }

      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== "") {
        showStatus("Message sent. Thank you!", "success");
        contactForm.reset();
        return;
      }

      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const phone = contactForm.elements.phone.value.trim();
      const message = contactForm.elements.message.value.trim();

      if (!name || !email || !message) {
        showStatus("Please fill in your name, email, and message.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      if (window.location.protocol === "file:") {
        showStatus(
          "Open this site through a local server or after uploading it online — the form cannot send from a file:// URL.",
          "error"
        );
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/" + encodeURIComponent(recipient),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              phone: phone || "Not provided",
              message: message,
              _subject: config.subject || "New website contact message",
              _template: "table",
            }),
          }
        );

        const data = await response.json().catch(function () {
          return {};
        });

        if (!response.ok) {
          throw new Error(data.message || "Could not send your message. Please try again.");
        }

        showStatus("Your message was sent successfully! — We'll get back to you asap.", "success");
        contactForm.reset();
      } catch (err) {
        showStatus(
          err.message || "Something went wrong. Please try again or email us directly.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
    });
  }
})();
