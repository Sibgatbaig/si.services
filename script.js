(function () {
  // Set your WhatsApp number: country code + number, no + or spaces (e.g. India: 919876543210)
  const WHATSAPP_NUMBER = "919479363323";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  const form = document.querySelector(".contact-form");
  const yearEl = document.getElementById("year");
  const formSuccess = document.getElementById("form-success");
  const nextInput = document.getElementById("formsubmit-next");
  const whatsappBtn = document.getElementById("whatsapp-submit");
  const whatsappRow = document.getElementById("whatsapp-contact-row");
  const whatsappLink = document.getElementById("whatsapp-contact-link");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (nextInput && window.location.protocol !== "file:") {
    const base = window.location.href.split("#")[0].split("?")[0];
    nextInput.value = base + "?sent=1#contact";
  }

  if (new URLSearchParams(window.location.search).get("sent") === "1") {
    if (formSuccess) formSuccess.hidden = false;
    if (form) form.hidden = true;
  }

  function buildEnquiryText() {
    if (!form) return "";
    const name = form.querySelector('[name="name"]')?.value?.trim() || "";
    const email = form.querySelector('[name="email"]')?.value?.trim() || "";
    const service = form.querySelector('[name="service"]')?.value?.trim() || "Not specified";
    const message = form.querySelector('[name="message"]')?.value?.trim() || "";
    const lines = [
      "New enquiry - SI Solutions Ltd",
      "",
      "Name: " + name,
      "Email: " + email,
      "Service: " + service,
      "",
      "Details:",
      message,
    ];
    return encodeURIComponent(lines.join("\n"));
  }

  function openWhatsApp() {
    if (!WHATSAPP_NUMBER) {
      alert(
        "Add your WhatsApp number in script.js (WHATSAPP_NUMBER).\nExample for India: 919876543210"
      );
      return;
    }
    if (!form) return;
    const name = form.querySelector('[name="name"]');
    const message = form.querySelector('[name="message"]');
    if (!name?.value?.trim()) {
      name?.focus();
      alert("Please enter your name first.");
      return;
    }
    if (!message?.value?.trim()) {
      message?.focus();
      alert("Please enter project details first.");
      return;
    }
    const text = buildEnquiryText();
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank", "noopener");
  }

  if (WHATSAPP_NUMBER) {
    const waUrl = "https://wa.me/" + WHATSAPP_NUMBER;
    if (whatsappRow) whatsappRow.hidden = false;
    if (whatsappLink) {
      whatsappLink.href = waUrl;
      whatsappLink.target = "_blank";
      whatsappLink.rel = "noopener";
    }
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", openWhatsApp);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  });

  window.addEventListener("scroll", function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  });
})();
