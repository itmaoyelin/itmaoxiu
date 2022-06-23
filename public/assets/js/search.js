//获取到用户输入的关键字
var key = getUrlParams('key');
// console.log(keys);
//向服务器发送请求索要搜索后的数据
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (response) {
        // console.log(response);
        var html = template('contentTpl', { data: response });
        $('#contentBox').html(html);
        // console.log(html);
    }
})