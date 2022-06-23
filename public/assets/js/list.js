//获取到地址栏中的分类id
//调用getUrlParams(name)方法获取id
var id = getUrlParams('id');
// console.log(id);
//根据分类id获取到文章列列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + id,
    success: function (response) {
        //    console.log(response);
            var html = template('contentTpl', { data: response });
            // console.log(html);
           $('#contentBox').html(html);  
    }
});

//根据分类id获取到文章分类
$.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function (response) {
        // console.log(response);
        $('#category').html(response.title);
    }
})