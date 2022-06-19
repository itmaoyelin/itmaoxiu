//向服务器发送请求索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (response) {
        // console.log(response);
        var recommendTpl = `
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="封面丢失">
          <span>{{$value.title.substr(0,25)}}......</span>
        </a>
      </li>
      {{/each}}
      `;
        var html = template.render(recommendTpl, { data: response });
        // console.log(html);
        $('#hotsBox').html(html);
    }
})