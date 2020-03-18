console.log(1);


$(function(){
    var $username = $("#username")
        $telphone = $('#telephone')
        $password = $('#password')
        $pwid = $("#password_id")
        $getId = $('#getId')
        $register = $('button.submit')
        $namemsg = $("#name-msg")
        $telmsg = $("#tel-msg")
        $pwmsg = $("#pw-msg")
        $pwidmsg = $("#password_id-msg")
        
    errmsg($namemsg);
    errmsg($telmsg);
    errmsg($pwmsg);
    errmsg($pwidmsg);
    function errmsg($msg){
        $msg.hide();

    }
    $register.click(function(){
        validate_required($username.val(),$namemsg);
        validate_required($telphone.val(),$telmsg);
        validate_required($password.val(),$pwmsg);
        validate_required($pwid.val(),$pwidmsg,);
        isPoneAvailable($telphone);
        namevailable($username)
    });
    $getId.click(function(){
        setCode($getId, 60)
    })
    //60s倒计时
    function setCode($getCodeInput, countdown) {
        if (countdown == 0) {
         $getCodeInput.attr('disabled', false);
         $getCodeInput.val("获取验证码");
         sessionStorage.removeItem("countdown");
         return;
        } else {
         $getCodeInput.attr('disabled', true);
         $getCodeInput.val("重新发送(" + countdown + ")");
         countdown--;
        }
        sessionStorage.setItem("countdown", countdown);
        window.setTimeout(function () {
         setCode($getCodeInput, countdown);
        }, 1000);
       }
    // 检验表单是否为空
    function validate_required(field,$msg)
    {
    with (field)
        {
        if (field==null||field=="")
            {
                $msg.show();
                return false}
        else {return true}
        }
    }
    // 正则表达式检验是否为有效手机号
    function isPoneAvailable(e) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(e.val())) {
            {alert('非有效手机号');return false}

        } else {
            return true;
        }
    }
    //用户名仅支持中英文、数字和下划线，且不能为纯数字
    
    function namevailable($data){
        if(!/^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/.test($data.val())){
            $namemsg.show();
            return false;
        }else if(/^[0-9]+$/.test($data.val())){
            $namemsg.show();
            return false;
        }
        return true;
    }
})