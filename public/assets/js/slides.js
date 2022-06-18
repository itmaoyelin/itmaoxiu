//当管理员选择文件时
$('#image').on('change', function () {
    //用户选择的文件
    var file = this.files[0];
    //创建formData对象实现二进制文件上传
    var formData = new FormData();
    //将选择的文件添加到formData对象中
    formData.append('image', file);
    //向服务器端发送请求实现图片上传
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response[0].image);
            // 实现头像预览功能
            $('#preview').attr('src', response[0].image);
            $('#preview').show(); //显示图片
            $('#hiddenImage').val(response[0].image); //把图片地址存在隐藏域里面
        }
    });

});

//添加轮播图
$('#slidesForm').on('submit', function () {
    var dataForm = $(this).serialize();
    // console.log(dataForm)
    $.ajax({
        type: 'post',
        url: '/slides',
        data: dataForm,
        success: function (response) {
            // console.log(response);
            location.reload();
        }
    })
    return false;
});

//向服务器发送请求 索要轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response);
        var html = template('imageTpl', { data: response });
        // console.log(html);
        $('#imageBox').html(html);

    }
});

//删除轮播图
$('#imageBox').on('click', '.delete', function () {
    if (confirm('您真的要删除轮播图吗?')) {
        var id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        });
    }
   
});
