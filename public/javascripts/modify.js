$(function () {

    $('.go-back').click(() => {
        window.history.back();
    })

    $('.save-btn').click(() => {
        let title = $('.modify-form .title'),
            content = $('.modify-form .content'),
            regex = /<[^<>]+>/g;
        if (title.val().trim() == '') {
            title.focus();
            return;
        }
        if (content.val().trim() == '') {
            content.focus();
            return;
        }
        if (regex.test(title.val()) || regex.test(content.val())) {
            $('.modify-form .tip').html("提示：标题或内容不能包含<xxx>等字符");
            setTimeout(function () {
                $('.modify-form .tip').html('');
            }, 6000)
        }
        else {
            $.ajax({
                url: "/modifytopic",
                data: {
                    mid: $('.modify-form .mid').val(),
                    title: title.val(),
                    content: content.val()
                },
                type: "POST",
                cache: false,
                dataType: 'json',
                success: function (msg) {
                    alert('修改成功');
                    window.location.href = "/";
                },
                error: function (err) {
                    alert(err.responseJSON.error);
                }
            })
        }
    })
})