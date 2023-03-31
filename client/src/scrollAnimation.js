//Scroll Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        else {
            entry.target.classList.remove("show");
        }
    });
});
const targets = document.querySelectorAll(".scroll");
targets.forEach(target => {
    observer.observe(target);
});