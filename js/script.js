$(document).ready(function () {

  let header = $('.header');
  let submenu = $('.submenu');

  // 이전의 위치값 저장
  let rememberScY = $(window).scrollTop();
  $(window).scroll(function () {
    let temp = $(window).scrollTop();
    // 헤더 스크롤 크기변경
    if (temp > 0) {
      header.addClass('header-scroll');
    } else {
      header.removeClass('header-scroll');
    }

    // // 현재 스크롤바의 위치 위치
    // if (temp > 790) {

    //   header.addClass('header-scroll-790');
    //   if (temp > rememberScY) {
    //     // console.log('아래로 화면 이동했다.')
    //     //메뉴가 숨겨진다.
    //     header.css('top', '-110px');
    //   } else {
    //     // console.log('위로 화면 이동했다.');
    //     // 메뉴가 펼쳐진다.
    //     header.css('top', '0px');
    //   }

    // } else {
    //   header.removeClass('header-scroll-790');
    //   header.removeAttr('style');
    // }
    // rememberScY = temp;


    // 메뉴 나타남
    new Waypoint({
      element: $('.notice'),
      handler: function (direction) {
        if (direction == 'down') {
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
          }
          rememberScY = temp;

        } else if (direction == 'up') {
          header.css('top', '0px');
          header.addClass('header-scroll-790');
        }
      },
      offset: '0%'
    });



  });



  // 메인비주얼 슬라이드
  let visualSlideTime = [15000, 6000, 6000, 6000];
  let visualSlideNow = 0;
  let visualSlideTotal = visualSlideTime.length;

  let visualSlideVideo = $('#videoV').get(0);
  console.log(visualSlideVideo);
  // console.log(visualSlideVideo.duration);

  // 비디오 실행하기
  visualSlideVideo.currentTime = 0;
  visualSlideVideo.play();

  let visualTimer;

  let swVisual = new Swiper('.sw-visual', {
    spaceBetween: 30,
    effect: "fade",
    // loop: true,
    // autoplay: {
    //   // delay: 5000,
    //   // disableOnInteraction: false },
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

    // 해당 번호로 슬라이드를 강제로 이동시킨다.
    // 현재 loop 가 false 라서 그냥 숫자를 넘겨도 된다.
    // 카페 글 참조.
    swVisual.slideTo(visualSlideNow);
    // console.log(visualSlideNow)

    if (visualSlideNow == 0) {
      // 비디오 실행하기
      visualSlideVideo.pause();
      visualSlideVideo.currentTime = 0;
      visualSlideVideo.play();
    }

    // 시간을 다시 셋팅하고 타이머를 만든다.
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
  $(".news-box-title").dotdotdot();
  $(".news-box-txt").dotdotdot();
};