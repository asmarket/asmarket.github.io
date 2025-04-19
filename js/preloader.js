document.addEventListener('DOMContentLoaded', () => {
    // Hide preloader after page loads
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    });
});