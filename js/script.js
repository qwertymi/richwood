$(document).ready(function () {


  $("html").css("overflow", "hidden");

  let modalWrap = $(".modal-wrap");
  let modalClose = $(".modal-close");
  let modalOpen = $(".modalopen");
  let modalCloseFn = () => {
    modalWrap.stop().fadeOut(200);
    $("html").css("overflow", "auto");
    modalOpen.show();
  };

  modalOpen.hide();
  modalClose.click(function () {
    modalCloseFn();
  });
  $("html").keydown(function (key) {
    if (key.keyCode) {
      modalCloseFn();
    }
  });

  let modalMain = $(".modal-main");
  modalMain.click(function (event) {
    event.stopPropagation();
  });
  modalWrap.click(function () {
    modalCloseFn();
  });

  modalOpen.click(function () {
    modalWrap.stop().fadeIn(200);
    $("html").css("overflow", "hidden");
    modalOpen.hide();
  });



  let header = $('.header');
  let submenu = $('.submenu');

  // 이전의 위치값 저장
  let rememberScY = $(window).scrollTop();


  $(window).scroll(function () {
    let temp = $(window).scrollTop();
    // 헤더 스크롤 크기변경
    if (temp > 0) {
      header.addClass('header-scroll');
      submenu.css('top', '112px');
      if (window.innerWidth <= 1250) {
        submenu.css('top', '120px');
      }
    } else {
      header.removeClass('header-scroll');
      submenu.css('top', '130px');
      if (window.innerWidth <= 1250) {
        submenu.css('top', '120px');
      }
    }


    // 메뉴 나타남
    new Waypoint({
      element: $('.notice'),
      handler: function (direction) {
        // 1250보다작을때
        if (window.innerWidth <= 1250) {
          if (direction == 'down') {
            if (temp > rememberScY) {
              header.css('top', '-110px');
            } else if (window.innerWidth >= 930) {
              header.css('top', '0px');
              submenu.css('top', '120px');
            }
            rememberScY = temp;
          } else if (direction == 'up') {
            header.css('top', '0px');
            header.addClass('header-scroll-790');
            submenu.css('top', '120px');
          }
        }

        // 1250보다 클때
        else if (direction == 'down') {
          header.css('top', '-110px');
          header.addClass('header-scroll-790');

          if (temp > rememberScY) {
            // console.log('아래로 화면 이동했다.')
            //메뉴가 숨겨진다.
            header.css('top', '-110px');
          } else {
            // console.log('위로 화면 이동했다.');
            // 메뉴가 펼쳐진다.
            header.css('top', '0px');
            submenu.css('top', '112px');

          }
          rememberScY = temp;

        } else if (direction == 'up') {
          header.css('top', '0px');
          header.addClass('header-scroll-790');
          submenu.css('top', '112px');
        }
      },
      offset: '0%'
    });
  });


  // 1250 반응형
  $(window).resize(function () {
    if (window.innerWidth <= 1250) {
      submenu.css('top', '120px');
    } else {
      submenu.css('top', '130px');
    }
  })

  // 메인비주얼 슬라이드
  let visualSlideTime = [15000, 6000, 6000, 6000];
  let visualSlideNow = 0;
  let visualSlideTotal = visualSlideTime.length;

  let visualSlideVideo = $('#videoV').get(0);

  // 비디오 실행하기
  visualSlideVideo.currentTime = 0;
  visualSlideVideo.play();

  let visualTimer;

  let swVisual = new Swiper('.sw-visual', {
    spaceBetween: 30,
    effect: "fade",
    pagination: {
      el: ".vs-pg",
      clickable: true,
    }
  });


  visualTimer = setInterval(function () {
    goVisual();
  }, visualSlideTime[visualSlideNow], 1);

  function goVisual(_dir) {
    if (_dir == 1) {

      visualSlideNow++;
      if (visualSlideNow >= visualSlideTotal) {
        visualSlideNow = 0;
      }

    } else {

      visualSlideNow--;
      if (visualSlideNow < 0) {
        visualSlideNow = visualSlideTotal - 1;
      }

    }
    swVisual.slideTo(visualSlideNow);

    if (visualSlideNow == 0) {
      visualSlideVideo.pause();
      visualSlideVideo.currentTime = 0;
      visualSlideVideo.play();
    }

    // 시간을 다시 셋팅, 타이머를 만든다.
    clearInterval(visualTimer);
    visualTimer = setInterval(function () {
      goVisual();
    }, visualSlideTime[visualSlideNow]);
  }

  let vsButtonPrev = $('.vs-button-prev');
  let vsButtonNext = $('.vs-button-next');
  vsButtonPrev.click(function () {
    goVisual(-1);
  });

  vsButtonNext.click(function () {
    goVisual(1);
  });

  // 회사소식 슬라이드
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
      formatFractionCurrent: function (number) {
        return ('0' + number).slice(-2);
      },
      formatFractionTotal: function (number) {
        return ('0' + number).slice(-2);
      },
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          ' / ' +
          '<span class="' + totalClass + '"></span>';
      }
    }
  });
  // 회사사업 컨텐츠 전환(color)
  let bs1 = $('.bs-1-bt');
  let bs2 = $('.bs-2-bt');
  let bs1Content = $('.bs-1');
  let bs2Content = $('.bs-2');

  bs1.click(function () {
    bs2Content.css('display', 'none');
    bs1Content.css('display', 'block');
    bs2.removeClass('blue');
    bs1.addClass('red');
  });
  bs2.click(function () {
    bs1Content.css('display', 'none');
    bs2Content.css('display', 'block');
    bs1.removeClass('red');
    bs2.addClass('blue');
  });

  // 검색 여닫기
  let searchBox = $('.search-cate')
  let searchAr = $('.search-cate > span');
  let searchNow = $('.search-cate-now');
  let searchBoxList = $('.search-cata-list');
  searchBox.click(function (event) {
    event.stopPropagation();
    searchAr.toggleClass('search-cate-ar-rot');
    searchBoxList.toggle();
  });

  $('body').click(function () {
    searchBoxList.hide();
    searchAr.removeClass('search-cate-ar-rot');
  });

  // 검색 선택한 카테고리 표시
  let searchBoxListA = $('.search-cata-list li a');
  searchBoxListA.on('click', function (event) {
    event.preventDefault();
    let temp = $(this).text();
    searchNow.text(temp);
  });

  // 검색 카테고리 위아래 방향
  new Waypoint({
    element: $('.search'),
    handler: function (direction) {
      if (direction == 'down') {
        $('.search-cata-list').removeClass('search-cata-list-up');
      } else if (direction == 'up') {
        $('.search-cata-list').addClass('search-cata-list-up');
        if (window.innerWidth <= 1560) {
          $('.search-cata-list').removeClass('search-cata-list-up');
        }
      }
    },
    offset: '40%'
  });


  // 푸터 richwood 
  let footerBt = $('.footer-richwood');
  let footerContent = $('.footer-info');
  let footerAr = $('.footer-richwood > span');
  footerBt.click(function () {
    footerContent.stop().slideToggle(300);
    footerAr.toggleClass('footer-richwood-ar-rot');
  });


});

// 뉴스 말줄임(...)
window.onload = function () {
  AOS.init();


};