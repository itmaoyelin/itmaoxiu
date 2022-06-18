// 向服务器发送请求,获取文章分类数据
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
            $('#preview').prop('src', response[0].cover);
            $('#preview').show();
        }
    });
});



//当添加文章表单提交时
$('#addForm').on('submit', function () {
    //获取表单数据
    var formdata = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formdata,
        success: function () {
            location.href = '/admin/posts.html';//跳转到文章列表页面
        }
    })
    
    return false;

});

// console.log(getUrlParams('id'));
//获取浏览器地址栏的id参数
var id = getUrlParams('id');
if (id != -1) {
    //根据id获取文章详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories;
                    // console.log(response.createAt);
                    var html = template('modifyTpl', response);
                    // console.log(html);
                    $('#modifyBox').html(html);
                    $('#preview').prop('src',response.thumbnail);
                    $('#preview').show();
                   
                    // 当选择文件时，触发事件
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
                 $('#preview').prop('src', response[0].cover);
                       }
                     });
                   });

                }
            });
        }
    });
}


//从浏览器地址栏中获取查询参数
function getUrlParams(name) {
    var paramsArr = location.search.substr(1).split('&');//截取之后再分割
    for (var i = 0; i < paramsArr.length; i++){
        if (paramsArr[i].split('=')[0] == name) {
            return paramsArr[i].split('=')[1];
        }
    }
    return -1;
}

//当修改文章信息表单发生提交行为时
$('#modifyBox').on('submit', '#modifyForm', function () {
    // alert('1');
    //获取修改的表单内容
    var formData = $(this).serialize();
    //获取修改的文章id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html';
        }
    })
    return false;
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
    return year + '-' + month + '-' + day +'T'+hours + ':' + minutes+':'+'00' ;
};