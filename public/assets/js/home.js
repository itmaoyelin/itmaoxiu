//向服务器端发送请求，索要轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response);
        var html = template('slidesTpl', { data: response });
        $('#slidesBox').html(html);
        //轮播效果
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
  
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
  
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
  
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        });
    }
});

//向服务器发送请求索要最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (response) {
        // console.log(response);
        var html = template('recentTpl', { data: response });
        // console.log(html);
        $('#recentBox').html(html);
    }
});

//退出
$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
      // alert('用户点击了确认按钮')
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = '/admin/login.html';
        },
        error: function () {
          alert('退出失败')
        }
      })
    }
});