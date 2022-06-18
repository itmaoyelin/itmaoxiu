//当管理员选择网站图标时
$('#logo').on('change', function () {
    //获取到选择的文件
    var file = this.files[0];
    var formData = new FormData();
    //将选择的文件追加到formData对象中
    formData.append('logo', file);
    //向服务器端发送请求实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response[0].logo);
            $('#logoHidden').val(response[0].logo);//将图片地址存放到隐藏域中
            $('#preview').attr('src', response[0].logo); //预览图片

        }
    });
});

//当网站设置表单发生提交行为时
$('#settingsBox').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (response) {
            // console.log(response);
            location.reload();
        }
    });
    return false;
});

//向服务器端发送请求， 索要网站设置的数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        // console.log(response);
        if (response) {
            //将隐藏域存放logo地址
            $('#logoHidden').val(response.logo);
            //将网站图标显示出来
            $('#preview').attr('src', response.logo);
            $('#title').val(response.title);
            //将是否开启评论功能显示在页面中
            $('#comment').prop('checked', response.comment);
            //将是否经过人工审核显示在页面中
            $('#review').prop('checked', response.review);
        }
    }
});