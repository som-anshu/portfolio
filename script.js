const projectsSwiper = new Swiper('.bundle-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: { el: '.bundle-swiper .pagination', clickable: true },
    breakpoints: { 768: { slidesPerView: 1.5 } }
});

const expSwiper = new Swiper('.exp-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.exp-swiper .pagination', clickable: true }
});

const achievementsSwiper = new Swiper('.achievements-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.achievements-swiper .pagination', clickable: true },
    breakpoints: { 640: { slidesPerView: 2 } }
});
