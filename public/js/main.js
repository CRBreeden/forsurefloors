document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('contact-msg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('cf-name').value,
          contact: document.getElementById('cf-contact').value,
          description: document.getElementById('cf-description').value,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        contactForm.reset();
        contactMsg.textContent = "Thanks! We'll be in touch within 24 hours.";
        contactMsg.style.color = '#7ddb8e';
      } else {
        contactMsg.textContent = data.error || 'Something went wrong. Please call us directly.';
        contactMsg.style.color = '#ff8080';
      }
    } catch {
      contactMsg.textContent = 'Something went wrong. Please call us directly.';
      contactMsg.style.color = '#ff8080';
    }

    contactMsg.style.display = 'block';
    btn.textContent = 'Request Free Quote';
    btn.disabled = false;
  });
}
