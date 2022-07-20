$(document).ready(function () {
  
  new Swiper('.sw-visual', {
    loop: true,
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".vs-pg",
      clickable: true,
    }
  });

  new Swiper('.notice-swiper', {
    loop: true,
    touchRatio: 0,
    effect: "fade",
    speed: 1000,
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".notice-next",
      prevEl: ".notice-prev",
    },
    pagination: {
      el: ".notice-pg",
      type: 'fraction',
    }
  });


});

window.onload = function () {
  AOS.init();
  $(".news-box-title").dotdotdot();
  $(".news-box-txt").dotdotdot();
};