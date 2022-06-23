// $.ajax({
//     type: 'post',
//     url: '/comments',
//     data: {
//         state: 1,
//         content: "文章很精彩",
//         post: "62ac908888d995ee48d44810",
     
//     },
//     success:function() {
//         console.log('a');
//     }
// })




//向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $('#commentsBox').html(html);
        //分页
        var page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
});

//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page,
        },
        success: function (response) {
            console.log(response);
            var html = template('commentsTpl', response);
            // console.log(html);
            $('#commentsBox').html(html);
            //分页
            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    });
};

//当审核按钮被点击时
$('#commentsBox').on('click', '.status', function () {
    //获取当前评论状态
    var status = $(this).attr('data-status');
    //获取当前评论id
    var id = $(this).attr('data-id');
    var statusModify = status == 0 ? 1 : 0; //修改当前状态
    // console.log(id, status,statusModify);
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: statusModify,
        },
        success: function () {
            location.reload();
        }
    });
});

//当点击删除评论时
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您确定要删除评论吗?')) {
        //获取到当前评论id
        var id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload(); //刷新页面
            }
        })
    }
  
});

