AOS.init({ duration: 800, once: true });

// Typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('typewriter-text');
  const words = ['Flutter Developer', 'iOS Developer', 'UI/UX Designer'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex++);
      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      textElement.textContent = currentWord.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 100 : 150);
  }
  type();
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.links').classList.toggle('show');
});

// Snackbar helper (responsive bottom)
function showSnackbar(message, success=true) {
  let snackbar = document.createElement('div');
  snackbar.className = 'snackbar';
  snackbar.textContent = message;
  snackbar.style.background = success ? '#4caf50' : '#f44336';
  snackbar.style.position = 'fixed';
  snackbar.style.left = '50%';
  snackbar.style.transform = 'translateX(-50%)';
  snackbar.style.padding = '12px 24px';
  snackbar.style.color = '#fff';
  snackbar.style.borderRadius = '5px';
  snackbar.style.zIndex = '9999';
  snackbar.style.opacity = '0';
  snackbar.style.transition = 'opacity 0.3s ease, bottom 0.3s ease';

  document.body.appendChild(snackbar);

  // Responsive bottom offset
  const bottomOffset = window.innerWidth <= 768 ? 90 : 70; // higher on small screens
  setTimeout(() => { 
    snackbar.style.bottom = bottomOffset + 'px';
    snackbar.style.opacity = '1';
  }, 10);

  setTimeout(() => { 
    snackbar.style.opacity = '0';
    snackbar.style.bottom = (bottomOffset - 20) + 'px';
    setTimeout(() => snackbar.remove(), 300); 
  }, 3000);
}

// Contact form submission with validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = this.querySelector("input[name='name']").value.trim();
  const email = this.querySelector("input[name='email']").value.trim();
  const message = this.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
    showSnackbar("Please fill in all fields.", false);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showSnackbar("Please enter a valid email address.", false);
    return;
  }

  const submitButton = this.querySelector("button");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  fetch("https://script.google.com/macros/s/AKfycbwIg6COOcd-SnW3ZPIvYFagRuNqzaIai5kcHSAZfGmuRaRt32IS9R_kdRT_mccwPVIr/exec", {
    method: "POST",
    body: new FormData(this)
  })
  .then(res => res.text())
 .then(data => {
    showSnackbar("Your message has been successfully sent! I will review it shortly and get back to you as soon as possible. Thank you for reaching out! ✅", true);
    this.reset();
    submitButton.disabled = false;
    submitButton.textContent = originalText;
})

  .catch(err => {
    console.error(err);
    showSnackbar("Error sending message. Please try again.", false);
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  });
});
