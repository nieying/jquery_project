/*
 * filename:      common.js
 * author:        kongpc88@gmail.com 
 * date:          2015-05-04
 * description:   通用js，依赖jQuery
 */

/*全局启动函数*/
$(function(){
    
    /*搜索栏效果*/
    $(".search").focus(function(){
        $(this).animate({width:"200px"});
    });
    $(".search").blur(function(){
        $(this).animate({width:"150px"});
    });
    
    /*导航hover样式*/
    /*$(".main-nav a").hover(function(){
        $(this).parent().find(".l-arr:first").show();
    },function(){
        $(this).parent().find(".l-arr:first").hide();
    });*/
    $(".r-arr").toggle(function(){
        $(this).find("i").css({ "border-top": "6px solid transparent","border-bottom": "6px solid  transparent", "border-left": "6px solid #c1c1c1","top":"-6px"});
        $(this).parent().find("ul").slideUp();
    },function(){
        $(this).find("i").css({ "border-left": "6px solid transparent","border-right": "6px solid  transparent", "border-top": "6px solid #c1c1c1","top":"-5px"});
        $(this).parent().find("ul").slideDown();
    });
    
    /*添加输入框光标*/
    $(".text-input").focus(function(){
        $(this).css("box-shadow","0 0 2px #2e83de");
    });
    $(".text-input").blur(function(){
        $(this).css("box-shadow","0 0 2px #e6e6e6");
    });
    
    /*刷新验证码*/
    $("#ver-code").bind("click",function(){
        $(this).attr("src","common/basic/reg?" + (new Date()).getTime());
    });
    
});



/*
 * 选项卡滑动
 * 参数为[点击目标，点击高亮，切换对应块]
 */
function tabSwitch(target, add_class, switch_target){
    /*实现对应切换*/
    $(target).bind("click",function(){
        var index = $(this).index();
        /*$(this).find(".tab-arr").show();*/
        if(switch_target != ""){
            $(switch_target).eq(index).show().siblings(switch_target).hide()/*.find("i").hide()*/;
        }
        if(add_class != ""){
            $(this).addClass(add_class).siblings(target).removeClass(add_class);
        }
    });
}

/*
 * 表单验证
 * 参数["验证表单","自定义要匹配的参数"]
 * 匹配表单name项，提供验证phone[手机号]，email[邮件]，password[密码]，re_password[确认密码]，msg_code[短信验证啊]
 */
function formValidate(form,param1){
    $(form).validate({
    /*修改错误信息显示位置*/
    errorPlacement: function(error, element){
        error.appendTo(element.parent().find(".error-box"));
    },
    rules: {
        username:{
            required: true,
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 11,
            digits: true,
        },
        password: {
            required: true,
            minlength: 6,
        },
        re_password: {
            required: true,
            minlength: 6,
            equalTo: param1,
        },
        old_password: {
            required: true,
            minlength: 6,
        },
        msg_code: {
            required: true,
            minlength: 4,
        },
        nickname: {
            required: true,
        },
        old_password: {
            required: true,
        },
        /*用户中心 - 留学信息判断*/
        realname: {
            required: true,
        },
        sex: {
            required: true,
        },
        specialized_subject: {
            required: true,
        },
        school:{
            required: true,
        },
    },
    messages: {
            username:{
                required: "请输入用户名",
            },
            email: {
                required: "请填写邮箱账号",
                email: "请填写正确邮箱格式",
            },
            phone: {
                required: "手机号码不能为空",
                minlength: "请输入11位数有效手机号码",
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于6位",
            },
            re_password: {
                required: "请输入确认密码",
                minlength: "密码不能小于6位",
                equalTo: "输入密码不一致"
            },
            old_password: {
                required: "请输入当前密码",
                minlength: "密码不能小于6位",
            },
            msg_code: {
                required: "验证码不能为空",
                minlength: "",
            },
            nickname: {
                required: "昵称不能为空",
            },
            old_password: {
                required: "请输入旧密码",
            },
            /*用户中心 - 留学信息判断*/
            realname: {
                required: "请填写真实姓名",
            },
            sex: {
                required: "请选择性别",
            },
            specialized_subject: {
                required: "请填写就读专业",
            },
            school:{
                required: "请填写就读学校",
            },
        }
    });
}

/*
 * 获取地址栏的指定参数的值
 * 参数：传入要获取的url参数即可
 */
function getQuery(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null){
          return unescape(r[2]);
     }else { return null;}
}

/*
 * 获取短信验证码
 * 参数：[手机号][回调函数]
 */
function getMsgCode(phone,callback){
    $.ajax({
        type: "post",
        url: "/common/basic/sendcode",
        data: { phone:phone },
        dataType: "json",
        success:function(json){
            callback(json);
        }, 
        error : function() {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

/*
 * 获取城市
 * 参数：[省份][回调函数]
 */
function getCityList(province,callback){
    $.ajax({
        type: "post",
        url: "/common/basic/getCity",
        data: "province_id=" + province,
        dataType: "json",
        success:function(json){
            callback(json);
        }, 
        error : function() {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}

/*
 * 展开或收起列表
 * 参数：[按钮][欲操作列表]
 */
function toggleList(btn,list){
    $(btn).click(function(){
        if($(list).is(":visible")){
            $(list).slideUp();
        }else {
            $(list).slideDown();
        }
    });
}















