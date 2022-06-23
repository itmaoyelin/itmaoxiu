//获取到文章id
//调用getUrlParams(name)方法获取文章id
var id = getUrlParams('id');
// console.log(id);
//评论是否经过人工审核
var review;

//根据文章id获取文章信息
$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (response) {
        // console.log(response);
        var html = template('detailTpl', response);
        // console.log(html);
        $('#articleBox').html(html);
    }
});

//点赞功能
$('#articleBox').on('click', '.like', function () {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function (response) {
            // console.log(response);
            // alert('点赞成功！感谢您的支持');
            location.reload();
        }
    })
});


//向服务器发送请求 索要网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        // console.log(response);
        review = response.review;
        if (response.comment) {
            var commentHtml = ` 
             <h2 class="title">评论</h2><br>
            <form>
              <textarea></textarea>
              <input type="submit" value="提交评论">
            </form>
            `;
            //渲染评论模板
            $('#commentBox').html(commentHtml);
        }
    }
});

//当评论表单发送提交行为时
$('#commentBox').on('submit', 'form', function () {
    //获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    // console.log(review);
    var state; //评论状态
    if (review) {
        //需要人工审核时
        state = 0; //未审核
    } else {
        //不需要人工审核时
        state = 1; //已审核
    }
    //向服务器发送请求 添加评论
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            state: state,
            content: content,
            post: id,
     
        },
        success: function () {
            alert('评论成功！');
            location.reload();
        },
        error: function () {
            alert('评论失败!');
        }
    
    })


    // alert(content);
    return false;
});

//向服务器发送请求 获取文章的评论列表
$.ajax({
    type: 'get',
    url: '/comments/post/' + id,
    success: function (response) {
        // console.log(response);
        var count = response.length;
        var html = template('commentListTpl', { data: response});
        // console.log(html);
        $('#commentList').html(html);
        $('#listCount').html(`评论列表(${count})`);
        
    }
})
