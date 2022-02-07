((jQuery,window,document)=>{
    class StarBucks {
        init(){
            this.header();
            this.section1();
            this.section2Notice();  
            this.section2Slide();   
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.goTop();
            this.quickMenu();
        }
        header(){
              const burgerBtn = $('.berger-btn');
              const mobileNav = $('#mobileNav');
              const mobileContainer = $('.mobile-container');
              const mobileCloseBtn = $('.mobile-close-btn');
              const mobileContainerLiA = $('.mobile-container li a');
              const mobileContainerLiANonSub = $('.mobile-container li a.non-sub');
              const findBtn = $('.find-btn');
              const findBox = $('.find-box');
              const mainBtn = $('.main-btn');
              const sub = $('.sub');
              const nav = $('#nav');

              //모바일 버튼 이벤트
              burgerBtn.on({
                click: function(){
                    mobileNav.addClass('addMobile');
                    mobileContainer.stop().animate({left:0}, 600);
                }
              });

              //화면너비가 960 초과이면 left가 100% 안으로 들어간다. 메뉴가 안 보이게 ->반응형
              $(window).resize(function(){
                  if( $(window).width()>960 ){
                    mobileContainer.stop().animate({left:110+'%'}, 300,function(){
                        mobileNav.removeClass('addMobile');
                    });
                    
                  }
              });

              mobileCloseBtn.on({
                 click:function(){
                    mobileContainer.stop().animate({left:110+'%'}, 300,function(){
                       mobileNav.removeClass('addMobile');
                  });
                 }
              });

              mobileContainerLiA.on({
                  click:function(){
                      $(this).toggleClass('addMobile');
                      $(this).next('div').slideToggle(300);
                      mobileContainerLiANonSub.removeClass('addMobile');
                  }
              });

              //통합검색 버튼 클릭 이벤트
              findBtn.on({
                  click: function(){
                      findBox.toggleClass('addInput');
                  }
              });

              //네비게이션 : 메인메뉴의 마우스 이벤트
              mainBtn.on({
                  mouseenter: function(){
                    mainBtn.removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    sub.stop().slideUp(0);
                    $(this).next().stop().slideDown(600,'easeOutExpo');
                  },
                  focusin: function(){
                    mainBtn.removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    sub.stop().slideUp(0);
                    $(this).next().stop().slideDown(600,'easeOutExpo');
                  }
              });

              //네비게이션을 마우스가 떠나면 
              //모두 초기화
              nav.on({
                  mouseleave: function(){
                    mainBtn.removeClass('addCurrent');
                    sub.stop().slideUp(600,'easeOutExpo');
                  }
              });

        }
        section1(){
            const img = $('.img');
            //애니메이션 페이드 인효과
             function ani(){
                img.eq(0).stop().animate({opacity:1},600, function(){
                    img.eq(1).stop().animate({opacity:1},600, function(){
                        img.eq(2).stop().animate({opacity:1},600, function(){
                            img.eq(3).stop().animate({opacity:1},600, function(){
                                img.eq(4).stop().animate({opacity:1},600);
                            });
                        });
                    });
                });
             }
             setTimeout(ani, 600);
        }
        section2Notice(){
            var cnt = 0;

                // 1. 메인 슬라이드 함수
                function mainSlide(){
                    $('.notice')                   .css({zIndex:1}).stop().animate({top:24},0);
                    $('.notice').eq(cnt==0?4:cnt-1).css({zIndex:2}).stop().animate({top: 0},0);
                    $('.notice').eq(cnt)           .css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
                }

                // 2. 다음 카운트 함수
                function nextCount(){
                    cnt++;  //1 2 3 4 0 1 2 3 4 
                    if(cnt>4){cnt=0}
                    mainSlide();
                }

                // 3. 자동타이머 함수(셋인터발)
                function autoTimer(){
                    setInterval(nextCount, 3000);
                }

                setTimeout(autoTimer, 100);
        }
        section2Slide(){
              const slide = $('.slide');
              const slideWrap = $('.slide-wrap');
              const pageBtn = $('.page-btn');
              const playBtn = $('.play-btn');
              const nextBtn = $('.next-btn');
              const prevBtn = $('.prev-btn');
              const promotionBtn = $('.promotion-btn');
              var cnt = 0;
              var setId = null;
              var winW = $(window).innerWidth()*0.9;    //창너비의 90% 크기
                
              // 반응형
                function resizeFn(){
                    if( $(window).innerWidth()<=819 ){
                      winW = $(window).innerWidth()*0.9;
                    }
                    else{ 
                      winW = 819;
                    }
                    slide.css({width: winW }); //슬라이드 너비
                    //mainSlide(); //실시간으로 메인슬라이드 연동 반응 즉각
                    slideWrap.stop().animate({left:-winW*cnt}, 0);
                }
                resizeFn();

                $(window).resize(function(){
                    resizeFn();
                });

                //   1. 메인슬라이드함수
                  function mainSlide(){
                    slideWrap.stop().animate({left:-winW*cnt}, 600, function(){
                         if(cnt>2){cnt=0}
                         if(cnt<0){cnt=2}
                         slideWrap.stop().animate({left:-winW*cnt}, 0);
                        //  슬라이드 번호별 스타일 적용 addClass
                        slide.removeClass('addCurrent');         //밝아지는 효과 삭제
                        slide.eq(cnt+1).addClass('addCurrent');  //밝아지는 효과 설정
                     });
                     pageEvent();
                  }

                //   2-1. 다음카운트함수
                  function nextCount(){
                    cnt++;
                    mainSlide();
                  }
                //  2-2. 이전카운트함수
                  function prevCount(){
                    cnt--;
                    mainSlide();
                  }

                //  3. 자동타이머함수(셋인터발)
                  function autoTimer(){
                    setId = setInterval(nextCount, 3000);
                  }
                  //autoTimer();
                  //setTimeout(autoTimer,10);
                  // 로딩시 실행 안함. 기본

                // 4. 페이지 이벤트 함수
                  function pageEvent(){
                    // console.log( cnt );
                    pageBtn                 .children().attr('src','./images/main_prom_off.png')
                    pageBtn.eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png')

                  }

                //  5. 페이지버튼 클릭 이벤트
                //배열 반복처리
                pageBtn.each(function(idx){
                    $(this).on({
                      click: function(e){
                        e.preventDefault();
                        cnt = idx;
                        mainSlide();
                        stopFn() // 정지
                      }
                    });
                 });

                // 6. 일시정지와 플레이버튼 클릭 이벤트

                  function stopFn(){
                    playBtn.children().attr('src','./images/main_prom_play.png');
                    playBtn.removeClass('on'); //삭제
                    // 슬라이드정지
                    clearInterval(setId);
                  }
                  function playFn(){
                    playBtn.children().attr('src','./images/main_prom_stop.png');
                    playBtn.addClass('on');  //꺼짐 클래스 추가
                    // 슬라이드플레이
                    autoTimer();
                  }


                  playBtn.on({
                     click: function(e){
                       e.preventDefault();

                          if( $(this).hasClass('on') ){ //참이면
                          // if( $(this).is('.on') ){ //클래스 아이디 요소
                            stopFn();
                          }
                          else{
                            playFn();
                          }
                     }
                   });

                                        
                   //7-1. 다음화살버튼 클릭 이벤트
                   nextBtn.on({
                     click: function(e){
                       e.preventDefault();
                       stopFn(); // 정지
                       nextCount();
                     }
                   });


                   //7-2. 이전화살버튼 클릭 이벤트
                   prevBtn.on({
                    click: function(e){
                      e.preventDefault();
                      stopFn(); // 정지
                      prevCount();
                    }
                  });


                  // 8. 프로모션 버튼 클릭 이벤트
                  // 클릭하면
                  // (슬라이드)#slide 박스가 부드럽게 슬라이드 업
                  promotionBtn.on({
                    click: function(e){
                      e.preventDefault();

                      if( $(this).hasClass('close')  ){ //오픈
                        $('#slide').stop().slideDown(600);
                        $(this).removeClass('close');
                        playFn();
                      }
                      else{ //닫기 close
                        $('#slide').stop().slideUp(600);
                        $(this).addClass('close');
                        //정지
                        stopFn();
                        cnt=0;
                        // $('.slide-wrap').stop().animate({left:-819*cnt}, 0);
                        mainSlide(); //처음으로 초기화
                      }
                      
                    }
                  });


                  // 슬라이드 랩 박스 위에 마우스 올라가면 슬라이드 정지
                  slideWrap.on({
                    mouseenter: function(e){
                      e.preventDefault();
                      stopFn();
                    },
                    mouseleave: function(e){
                      e.preventDefault();
                      playFn();
                    }
                  });

                  //슬라이드 콘테이너 박스 위에 마우스 떠나면 슬라이드 재실행
        }
        section3(){

        }
        section4(){
            const $window = $(window);
            const section4 = $('#section4');
            //윈도우 스크롤이벤트 : 페럴럭스 애니메이션 효과
            $window.scroll(function(){
                if( $window.scrollTop() == 0 ){
                    section4.removeClass('addAni');
                }
                if( $window.scrollTop() > 500 ){
                    section4.addClass('addAni');
                }
            });
        }
        section5(){
            const $window = $(window);
            const section5 = $('#section5');
            var sec3Top = $('#section3').offset().top-200;
               
                $window.scroll(function(){
                      if( $window.scrollTop() == 0 ){
                        section5.removeClass('addFadein');
                      }
                      if( $window.scrollTop() >= sec3Top ){
                        section5.addClass('addFadein');
                      }
                  });
        }
        section6(){
            const $window = $(window);
            const section6 = $('#section6');
            var sec4Top = $('#section4').offset().top;

                $window.scroll(function(){
                      if( $window.scrollTop() == 0 ){
                         section6.removeClass('addAni')
                      }
                      if( $window.scrollTop() >= sec4Top ){
                         section6.addClass('addAni')
                      }

                  });
        }
        section7(){
            const $window = $(window);
            const section7 = $('#section7');
            var sec6Top = $('#section6').offset().top-200;

                $window.scroll(function(){
                    if( $window.scrollTop() == 0 ){
                        section7.removeClass('addFade')
                    }
                    if( $window.scrollTop() >= sec6Top ){
                        section7.addClass('addFade')
                    }
                });
        }
        section8(){
            const $window = $(window);
            const section8 = $('#section8');
            var sec6Top = $('#section6').offset().top+200;

                $window.scroll(function(){
                    if( $window.scrollTop() == 0 ){
                        section8.removeClass('addAni')
                    }
                    if( $window.scrollTop() >= sec6Top ){
                        section8.addClass('addAni')
                    }
                });

                //반응형
                var leftW=null;
                var leftH=null;

                function leftResize(){

                  // 자체너비는 문제가 있음
                  // 이유는 안에 들어있는 이미지 작은이미지가 우측 으로 빠진것 때문에 크기 문제
                  // 그래서 
                  // 창너비가 960이하이면 
                  // left박스의 너비 = 창너비*(이미지너비 비율) 0.38125
                  // left박스의 높이 = left박스의 너비*높이 비율 0.85246

                  let winW = $window.innerWidth();          
                  if( winW <= 960 ){    // 창너비가 
                    leftW = winW * 0.38125;                 
                    leftH = leftW * 0.85246; //높이 = 너비*비율(85.246%)
                  }
                  else{
                    leftW = 366;
                    leftH = 312;
                  }
                  $('#section8 .left').css({ width:leftW, height:leftH });

                }
                leftResize();

                $window.resize(function(){
                  leftResize();
                });
        }
        goTop(){
            const GoTop = $('.go-top');
            const GoTopBtn = $('.go-top-btn');
            const htmlBody = $('html,body');
            const $window = $(window);
            GoTop.stop().fadeOut(1000);

            $window.scroll(function(){
                if( $window.scrollTop() >=100 ){
                    GoTop.stop().fadeIn(1000);
                }
                else{
                    GoTop.stop().fadeOut(1000);
                }
            });

            GoTopBtn.on({
                click:function(){
                    htmlBody.animate({scrollTop:0}, 600);
                }
            });
        }
        quickMenu(){
            const quickMenu = $('.quick-menu');
            const $window = $(window);
            // var quicTop = (창높이에서 - 퀵메뉴박스높이)/2;
            var quicTop1 = ($(window).height() - 96)/2;
            var quicTop2 = 150;
                 
                 function quickMenuFn(){
                    quickMenu.stop().animate({top: $window.scrollTop() + quicTop2 }, 600, "easeOutExpo");
                 }                               
             
                 quickMenuFn(); //로딩시

                 $window.scroll(function(){
                 quickMenuFn();
             });
        }
    }

    const newStarBucks = new StarBucks;
    newStarBucks.init();
})(jQuery,window,document);