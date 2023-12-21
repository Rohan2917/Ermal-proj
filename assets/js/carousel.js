$(document).ready(function () {
  $('.carousel-for-sections-card').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      600: {
        items: 2,
        slideBy: 2
      },
      1000: {
        items: 3,
        slideBy: 3
      }
    }
  });

  $('.happy-client-carousel-content').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },

      992: {
        items: 2,
        slideBy: 2
      }
    }
  });
});
