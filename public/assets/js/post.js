

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
            page:page,
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
    $.ajax({
        type: 'get',
        url: '/posts',
        data:formData,
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', { data: response });
            // console.log(html);
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', { data: response });
            $('#pageBox').html(pageHtml);
        }
    });
    return false;
})
