//

//向服务器发送请求 索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (response) {
        // console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
          <p class="title">{{$value.title.substr(0,20)}}...</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="封面丢失">
          </div>
        </a>
      </li>
      {{/each}}  
        `;
        var html = template.render(randomTpl, { data: response }); //渲染数据
        // console.log(html);
        $('#randomBox').html(html);

    }
});

//向服务器发送请求 索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (response) {
        // console.log(response);
        var commentsTpl = `
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value.post}}">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="头像丢失">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
        </li>
        {{/each}}
        `;
        var html = template.render(commentsTpl, { data: response });
        // console.log(html);
        $('#recentCommentsBox').html(html);

    }
});
//封装处理时间日期格式
function formateDate(date) {
    //将日期字符串转换为日期对象
    var date = new Date(date);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes =date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return year + '-' + month + '-' + day +' '+' ' +hours + ':' + minutes ;
};

//从浏览器地址栏中获取查询参数
function getUrlParams(name) {
  var paramsArr = location.search.substr(1).split('&');//截取之后再分割
  for (var i = 0; i < paramsArr.length; i++){
      if (paramsArr[i].split('=')[0] == name) {
          return paramsArr[i].split('=')[1];
      }
  }
  return -1;
}

// console.log(login);
//向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        //导航栏
        var topnavTpl = `
        <li><a href="/index.html">首页</a></li>
        {{each data}}
        <li><a href="/list.html?id={{$value._id}}">{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(topnavTpl, { data: response});
        // console.log(html);
        $('#topleftnav').html(html);
        
        //侧边导航栏
        var navTpl = `
        {{each datas}}
        <li><a href="/list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var navHtml = template.render(navTpl, { datas: response });
        // console.log(navHtml);
        $('#navBox').html(navHtml);

        //退出
       $('.right').on('click','#logout', function () {
       if (confirm('您真的要退出吗?')) {
       // alert('用户点击了确认按钮')
       $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.reload();
        },
        error: function () {
          alert('退出失败')
            }
          })
         }
      });

    }
});

//向服务器发送请求索要网站图标
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
      // console.log(response);
      $('#icon').attr('href', response.logo);//渲染网站图标
      $('#itmao').html(response.title);//渲染网站名称
  
    }
  });
//页尾
$('#footer').html(`<p>Copyright ©itmao 2022 备案号：<a target="_blank" rel="nofollow" href="https://beian.miit.gov.cn/">itmao</a> </p>`);

//获取到搜索表单 为其添加表单提交事件
$('.search form').on('submit', function () {
  // alert('qS');
  //获取到用户输入的关键字
  var key = $(this).find('.keys').val();
  // console.log(keys);
  //跳转到搜索结果页面 并传递用户输入的关键字
  location.href = '/search.html?key=' + key;

  return false;
});


//判断用户登录状态
if (login) {
  $.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
      // console.log(response);
      var nickName = response.nickName;
      var avatar = response.avatar;
      $('.right').html(`<li><a class="nick" href="javascript:;"><img src="${avatar}" class="userPhoto"></img>${nickName}<a></li>
      <li><a href="javascript:;" id="logout"><i class="fa fa-sign-out"></i>退出</a></li>`);
    }
  })
} else {
  $('.right').html(`<li><a href="/admin/login.html"><i class="fa fa-user-circle"></i>亲,请登录</a></li>`);
}