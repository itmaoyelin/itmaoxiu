$('#modifyForm').on('submit', function () {
    //获取用户在表单输入的内容
    var formData = $(this).serialize();
    //调用接口实现用户密码修改功能
    $.ajax({
        url: '/users/password',
        type: 'put',
        data: formData,
        success: function () {
            alert('密码修改成功,请重新登录！');
            location.href = "/admin/login.html";//跳转回登录页面
        }
    })
    
    return false;//阻止表达默认提交
})