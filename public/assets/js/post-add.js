//向服务器发送请求,获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response); 
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
});

//当选择文件时，触发事件
$('#feature').on('change', function () {
    //获取到管理员选择的文件
    var file = this.files[0];
    //创建formData 对象实现二进制文件上传
    var formData = new FormData();
    //将选择的文件追加到formData对象中
    formData.append('cover', file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax不要处理data属性对应的参数
        processData: false,
        //告诉$.ajax不要设置参数类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#thumbnail').val(response[0].cover);
          
        }
    });
});

//当添加文章表单提交时
$('#addForm').on('submit', function () {
//获取表单数据
    var formdata= $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formdata,
        success: function () {
            location.href = '/admin/posts.html';//跳转到文章列表页面
        }
    })
    
    return false;

})