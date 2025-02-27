document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarLinks = document.querySelectorAll('#navbar a');
    const title = document.getElementById('hero-title');
    const button = document.getElementById('hero-button');

    // Navbar show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('-translate-y-full');
        } else {
            navbar.classList.add('-translate-y-full');
        }
        setActiveLink();
    });

    // Active link highlighting based on scroll position
    function setActiveLink() {
        navbarLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    navbarLinks.forEach(l => l.classList.replace('text-blue-700', 'text-white'));
                    link.classList.replace('text-white', 'text-blue-700');
                }
            }
        });
    }

    // Handle clicks on navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

            navbarLinks.forEach(l => l.classList.replace('text-blue-700', 'text-white'));
            link.classList.replace('text-white', 'text-blue-700');
        });
    });

    setActiveLink();

    // Show the title immediately
    setTimeout(() => {
        title.classList.remove('opacity-0', 'translate-y-10');
    }, 100);

    // Show the button with a delay after the title
    setTimeout(() => {
        button.classList.remove('opacity-0', 'translate-y-10');
    }, 600);

    // Carousel Code (Moved out of the nested event listener)
    const carouselItems = document.getElementById('carousel-items');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('#carousel-dots div');
    const description = document.getElementById('carousel-description');

    const descriptions = ['Auditorium', 'Gym', 'Computer Lab', 'Classroom'];
    let currentIndex = 0;

    function updateCarousel(index) {
        const offset = -index * 100;
        carouselItems.style.transform = `translateX(${offset}%)`;

        dots.forEach(dot => dot.classList.replace('bg-white', 'bg-gray-500'));
        dots[index].classList.replace('bg-gray-500', 'bg-white');

        description.textContent = descriptions[index];
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? descriptions.length - 1 : currentIndex - 1;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === descriptions.length - 1) ? 0 : currentIndex + 1;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    updateCarousel(currentIndex);
});
