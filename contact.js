const form = document.querySelector(".contact-form");
const message = document.querySelector(".form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (typeof grecaptcha === "undefined") {
    message.textContent = "reCAPTCHA did not load. Check the site key and your domain.";
    return;
  }

  if (!grecaptcha.getResponse()) {
    message.textContent = "Please complete the reCAPTCHA.";
    return;
  }

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const reason = data.error || (data.errors || []).map((x) => x.message).join(", ");
      message.textContent = `Error ${res.status}: ${reason || "no details"}`;
      return;
    }

    form.reset();
    grecaptcha.reset();
    message.textContent = "Message sent. Thank you.";
  } catch (err) {
    message.textContent = `Could not send: ${err.message}`;
  }
});