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


//向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        //导航栏
        var topnavTpl = `
        <ul class="left">
        <li><a href="/index.html">首页</a></li>
        {{each data}}
        <li><a href="/list.html?id={{$value._id}}">{{$value.title}}</a></li>
        {{/each}}
      </ul>
      <ul class="right">
        <li><a href="/admin/login.html"><i class="fa fa-user-circle"></i>登录</a></li>
        <li><a href="javascript:;" id="logout"><i class="fa fa-sign-out"></i>退出</a></li>
      </ul>
        `;
        var html = template.render(topnavTpl, { data: response });
        // console.log(html);
        $('#topnav').html(html);
        
        //侧边导航栏
        var navTpl = `
        <h1 class="logo"><a href="index.html"><img src="assets/img/mao.png" alt=""></a></h1>
        <ul class="nav">
        {{each datas}}
        <li><a href="/list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        </ul>
        <div class="search">
        <form>
          <input type="text" class="keys" placeholder="输入关键字">
          <input type="submit" class="btn" value="搜索">
        </form>
      </div>
        `;
        var navHtml = template.render(navTpl, { datas: response });
        // console.log(navHtml);
        $('#navBox').html(navHtml);

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

