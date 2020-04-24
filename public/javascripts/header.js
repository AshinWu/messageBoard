$(function () {

    $('.logo').click(() => {
        window.location.href = '/';
    })

    //图片上传控制
    $('#pic').change(function () {
        if (this.files.length != 0) {
            var file = this.files[0],
                reader = new FileReader();
            if (!reader) {
                this.value = '';
                return ;
            };
            console.log(file.size, file.type);
            if (!/image/g.test(file.type)) {
                alert("请上传图片文件!");
                $('#picVal').val('');
                $('.reg-form #pic').val('');
                $('.reg-form .preview').attr('src', '');
                $('.reg-form .preview').fadeOut();
                return ;
            }
            if (file.size >= 1024 * 1024 / 2) {
                $('.reg-form #pic').val('');
                alert("请上传小于512kb的图片!")
                return ;
            }
            reader.onload = function (e) {
                this.value = '';
                $('.reg-form .preview').attr('src', e.target.result);
                $('.reg-form .preview').fadeIn();
                var image = new Image();
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext("2d");
                    canvas.width = 100;
                    canvas.height = 100;
                    ctx.clearRect(0, 0, 100, 100);
                    ctx.drawImage(image, 0, 0, 100, 100);
                    var blob = canvas.toDataURL("image/png");
                    $('#picVal').val(blob);
                }
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
    })

    //注册
    $('#reg-btn').click(() => {
        if ($('.reg-form input[name=name]').val().trim() == '') {
            alert('请输入用户名！');
        } else if (!$('.reg-form input[name=name]').val().match(/[0-9a-zA-Z_]{3,}/g)) {
            alert('用户名为至少三位的字母数字下划线组合');
        } else {
            $.ajax({
                url: "/signup",
                data: {
                    name: $('.reg-form input[name=name]').val(),
                    password: $('.reg-form input[name=password]').val(),
                    repeatpass: $('.reg-form input[name=repeatpass]').val(),
                    pic: $('#picVal').val(),
                },
                type: "POST",
                cache: false,
                dataType: 'json',
                success: function (msg) {
                    alert(msg.message);
                    window.location.href = "/";
                },
                error: function (err) {
                    alert(err.responseJSON.error);
                }
            })
        }
    })

    //登录
    $('.signin').click(() => {
        let nameInput = $('.login-form input[name=username]');
        if (nameInput.val().trim() === '') {
            nameInput.focus();
            return;
        }
        let pawInput = $('.login-form input[name=password]');
        if (pawInput.val().trim() === '') {
            pawInput.focus();
            return;
        }
        $.ajax({
            url: "/login",
            data: $('.login-form').serialize(),
            type: "POST",
            cache: false,
            dataType: 'json',
            success: function (msg) {
                if (!msg.code) {
                    $('input').val('');
                    alert('登录成功');
                    window.location.href = "/";
                } else {
                    alert(msg.message);
                }
                // console.log(msg);
            },
            error: function () {
                alert('异常');
            }
        })
    })

    //退出登录
    $('.signout').click(() => {
        let user = $('#username').val();
        $.ajax({
            url: "/logout",
            data: { user: user },
            type: "GET",
            cache: false,
            dataType: 'json',
            success: function (msg) {
                if (!msg.code) {
                    $('input').val('');
                    alert('退出成功');
                    window.location.href = "/";
                } else {
                    alert(msg.message);
                }
                console.log(msg);
            },
            error: function () {
                alert('异常');
            }
        })

    })
})
