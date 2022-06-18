
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log(response);
        var html = template('postsTpl', { data: response });
        // console.log(html);
        $('#postsBox').html(html);
        var pageHtml = template('pageTpl', { data: response });
        $('#pageBox').html(pageHtml);
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

//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
        },
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', { data: response });
            // console.log(html);
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', { data: response });
            $('#pageBox').html(pageHtml);
        }
    });
};

 //过滤分页
function changePageFilter(page, obj) {
    obj.page = page;
    // console.log(obj);
$.ajax({
    type: 'get',
    url: '/posts',
    data:obj,
    success: function (response) {
        // console.log(response);
        var html = template('postsTpl', { data: response });
        // console.log(html);
        $('#postsBox').html(html);
        var pageHtml = template('pageFilterTpl', { data: response ,obj:obj});
        $('#pageBox').html(pageHtml);
        }
    });
};


//向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var categoryHtml = template('categoryTpl', { data: response });
        $('#categoryBox').html(categoryHtml);
    }
});

//当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
    // alert('1');
    //获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    //从表单数据中获取查询参数
    function getFormDataParams(name) {
    var paramsArr = formData.split('&');//分割
    for (var i = 0; i < paramsArr.length; i++){
        if (paramsArr[i].split('=')[0] == name) {
            return paramsArr[i].split('=')[1];
        }
    }
    return -1;
    };
    var category= getFormDataParams('category');
    var state = getFormDataParams('state');
    var obj = {};
    if (category == 'all'&&state=='all') {
        obj = {};
    }
    if (category != 'all' && state == 'all') {
        obj.category = category;
    }
    if (category == 'all' && state != 'all') {
        obj.state = state;
    }
    if (category != 'all' && state != 'all') {
        obj.category = category;
        obj.state = state;
    }

   
    // console.log(obj);
    // console.log(formData);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: obj,
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', { data: response });
            // console.log(html);
            $('#postsBox').html(html);
            var pageHtml = template('pageFilterTpl', { data: response ,obj:obj});
            $('#pageBox').html(pageHtml);
        }
    });
    return false;
})


//当用户进行删除文章时
$('#postsBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除文章吗?')) {
        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.href = '/admin/posts.html'; //重定向
            }
        })
    }
})