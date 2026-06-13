
// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Play button interaction
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function () {
        alert('🎵 Music player integration coming soon!\n\nConnect Spotify, SoundCloud, or Bandcamp');
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});
