//导航栏
$('.navbar').html(`<button class="btn btn-default navbar-btn fa fa-bars"></button>
<ul class="nav navbar-nav navbar-right">
  <li><a href="/admin/password-reset.html"><i class="fa fa-user"></i>修改密码</a></li>
  <li><a href="javascript:;" id="logout"><i class="fa fa-sign-out"></i>退出</a></li>
</ul>`);

//侧边栏
$('.aside').html(`<div class="profile">
<img class="avatar" src="/uploads/mao3.jpg">
<h3 class="name">Maoker</h3>
</div>
<ul class="nav">
<li class="active">
  <a href="/admin/index.html"><i class="fa fa-dashboard"></i>创作屋</a>
</li>
<li>
  <a href="#menu-posts" class="collapsed" data-toggle="collapse">
    <i class="fa fa-thumb-tack"></i>作品管理<i class="fa fa-angle-right"></i>
  </a>
  <ul id="menu-posts" class="collapse">
    <li><a href="/admin/posts.html">所有文章</a></li>
    <li><a href="/admin/post-add.html">写文章</a></li>
    <li><a href="/admin/categories.html">分类目录</a></li>
  </ul>
</li>
<li>
  <a href="/admin/comments.html"><i class="fa fa-comments"></i>评论管理</a>
</li>
<li>
  <a href="/admin/users.html"><i class="fa fa-users"></i>用户管理</a>
</li>
<li>
  <a href="#menu-settings" class="collapsed" data-toggle="collapse">
    <i class="fa fa-cogs"></i>设置<i class="fa fa-angle-right"></i>
  </a>
  <ul id="menu-settings" class="collapse">
    <li><a href="/admin/slides.html">图片轮播</a></li>
    <li><a href="/admin/settings.html">网站设置</a></li>
  </ul>
</li>
</ul>`);



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
// console.log(userId);
//向服务器端发送请求，索要登录用户信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response) {
    // console.log(response);
    $('.profile .avatar').attr('src', response.avatar);
    $('.profile .name').html(response.nickName);
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
  
