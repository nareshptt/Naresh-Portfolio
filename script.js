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

// Snackbar helper
function showSnackbar(message, success=true) {
  let snackbar = document.createElement('div');
  snackbar.className = 'snackbar';
  snackbar.textContent = message;
  snackbar.style.background = success ? '#4caf50' : '#f44336';
  document.body.appendChild(snackbar);
  setTimeout(() => { snackbar.classList.add('show'); }, 10);
  setTimeout(() => { snackbar.classList.remove('show'); setTimeout(() => snackbar.remove(), 300); }, 3000);
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

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
    showSnackbar("Message sent successfully!", true);
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
