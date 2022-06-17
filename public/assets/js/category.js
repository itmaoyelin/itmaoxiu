//当添加分类表单发生提交行为时
$('#addCategory').on('submit', function () {
    //获取表单数据
    var formData = $(this).serialize();
    //向服务器发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();//刷新页面
        }
    });
 
    return false;//阻止默认提交

});

//发送ajax请求,向服务器获取分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //将服务器端返回的数据进行模板拼接
        var html = template('categoryListTpl', { data: response });
        // console.log(html);
        $('#categoryBox').html(html);
    }
});

//获取要修改的分类
$('#categoryBox').on('click', '.edit', function () {
    // 获取到要修改的分类id
    var id = $(this).attr('data-id');
    // alert(id);
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
           var html= template('modifyCategoryTpl', { data: response });
            // console.log(html);
            $('#formBox').html(html);
        }
    })
});

//修改分类
$('#formBox').on('submit', '#modifyCategory', function () {
    // alert('修改');
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;//阻止表单默认提交
});

//删除分类
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您确定要删除分类吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});

//获取全选按钮
var selectAll = $('#selectAll');
//获取批量删除按钮
var deleteMany = $('#deleteMany');
//当全选按钮状态发生改变时
selectAll.on('change', function () {
	//获取全选按钮当前状态
	var status = $(this).prop('checked');
	if (status) {
		deleteMany.show(); //显示
	} else {
		deleteMany.hide();//隐藏
	}
	// alert(status);
	//获取到所有分类 ,所有按钮选中状态与全选按钮保持一致
	$('#categoryBox').find('input').prop('checked', status);
});

//当分类前面的复选框发生变化时
$('#categoryBox').on('change', '.categoryStatus', function () {
	//获取到所有用户,在所有用户中过滤出选中的用户
	//判断所有用户数量是否与选中用户数量一致
	//如果一致，说明所有用户都是选中的，否则就是有用户没有被选中
	var inputs = $('#categoryBox').find('input');
	if (inputs.length == inputs.filter(':checked').length) {
		// alert('所有用户都是选中的');
		selectAll.prop('checked', true);
	} else {
		// alert('不是所有用户都是选中的');
		selectAll.prop('checked', false);
	}

	//如果选中的复选框按钮大于0
	if (inputs.filter(':checked').length > 0) {
		deleteMany.show(); //显示批量删除按钮
	} else {
		deleteMany.hide(); //隐藏
	}
});

//为批量删除的按钮添加点击事件
deleteMany.on('click', function () {
    var ids = [];
    //获取选中的分类
    var checkedCategory = $('#categoryBox').find('input').filter(':checked');
    //循环复选框 从复选框元素的身上获取data-id的值
    checkedCategory.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您真的要批量删除分类吗?')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + ids.join('-'),
            success: function (response) {
                //刷新页面
                location.reload();
            }
        });
    }
});