// 匿名函数包裹，防止外界操作的修改

$(function () {
    var role = 'all'
    window.onload = initTopicsList(role);

    //添加主题
    $('.post-btn').click(() => {
        let titleInput = $('.message-form .title'),
            contentInput = $('.message-form .content'),
            regex = /<[^<>]+>/g;
        if (titleInput.val().trim() === '') {
            titleInput.focus();
            return;
        }if (contentInput.val().trim() === '') {
            contentInput.focus();
            return;
        } 
        if(regex.test(titleInput.val()) || regex.test(contentInput.val())){
            $('.message-form .tip').html("提示：标题或内容不能包含<xxx>等字符");
            setTimeout(function(){
                $('.message-form .tip').html('');
            },6000)
        }
        else {
            console.log($('.message-form').serialize());
            $.ajax({
                url: "/addtopic",
                data: {
                    uid: $('.message-form input[name=uid]').val(),
                    user: $('.message-form input[name=user]').val(),
                    title: titleInput.val(),
                    content: contentInput.val()
                },
                type: "PUT",
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

    var totalList, totalNum;
    let ul = $('.list-ul');
    //初始化
    function initTopicsList(author) {
        $.ajax({
            url: "/gettopics",
            data: { author: author },
            type: "get",
            cache: false,
            dataType: 'json',
            success: function (res) {
                totalList = res.data.count;
                totalNum = Math.ceil(totalList / 10);
                let topics = res.data.raw;
                if (topics.length === 0) {
                    ul.append(`<div class="no-data">当前没有任何留言哦~</div>`);
                } else {
                    // for (let i = 0, j = topics.length; i < j; i++) {
                    $.each(topics, (index, item) => {
                        ul.append(`
                        <li class="li-`+ index + `">
                            <div class="list-li-div">
                                <div class="post-author">
                                    <div><img alt="用户头像" src="../images/user_pic/`+ item.ui_pic + `"></div>
                                    <div><span class="username">`+ item.author + `</span></div>
                                </div>
                                <div class="post-warpper">
                                    <div class="post-content">
                                        <div><span class="title" title=`+ item.mi_id + `>` + item.mi_title + `</span></div>
                                        <div>`+ item.mi_content + `</div>
                                    </div>
                                    <div class="post-moment">
                                        <div>
                                            <div class="operation-div operator-`+ item.ul_id + `"></div>
                                            <span>最后编辑于`+ timeFormat(item.mi_modify_time) + `<span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" class="item-`+ item.mi_id + `" name="item" value='` + escape(JSON.stringify(item)) + `'>
                        </li>
                        `);
                        showOperation(item.ul_id, item.mi_id);
                    })
                    $("#page").paging({
                        pageNum: 1, // 当前页面
                        totalNum: totalNum, // 总页码
                        totalList: totalList, // 记录总数量
                        callback: function (num) { //回调函数
                            let page = this.pageNum == 1 ? 0 : (num - 1) * 10;
                            console.log('num ' + num + ',start with ' + page);
                            ul.html('');//防止数据重复渲染
                            getTopics(author, page, 10);
                        }
                    });
                }
            },
            error: function (err) {
                alert('请求失败');
            }
        })
    }

    function getTopics(author, page, size) {
        $.ajax({
            url: "/gettopics",
            type: "get",
            data: {
                author: author,
                page: page,
                size: size
            },
            cache: false,
            dataType: 'json',
            success: function (res) {
                let topics = res.data.raw;
                if (topics.length === 0) {
                    ul.append(`<div class="no-data">当前没有任何留言哦~</div>`);
                } else {
                    // for (let i = 0, j = topics.length; i < j; i++) {
                    $.each(topics, (index, item) => {
                        ul.append(`
                        <li class="li-`+ index + `">
                            <div class="list-li-div">
                                <div class="post-author">
                                    <div><img alt="用户头像" src="../images/user_pic/`+ item.ui_pic + `"></div>
                                    <div><span class="username">`+ item.author + `</span></div>
                                </div>
                                <div class="post-warpper">
                                    <div class="post-content">
                                        <div><span class="title" title=`+ item.mi_id + `>` + item.mi_title + `</span></div>
                                        <div>`+ item.mi_content + `</div>
                                    </div>
                                    <div class="post-moment">
                                        <div>
                                            <div class="operation-div operator-`+ item.ul_id + `"></div>
                                            <span>最后编辑于`+ timeFormat(item.mi_modify_time) + `<span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" class="item-`+ item.mi_id + `" name="item" value='` + escape(JSON.stringify(item)) + `'>
                        </li>
                        `);
                        showOperation(item.ul_id, item.mi_id);
                    })
                }
            },
            error: function (err) {
                alert('请求失败');
            }
        })
    }

    // 防止dom没渲染完导致click失效
    $(document).on('click', '.delete', (that) => {
        if (confirm('确认删除该主题吗') === true) {
            //获取文章id
            let mid = that.currentTarget.title;
            $.ajax({
                url: "/deleteTopic",
                data: { mid: mid },
                type: "delete",
                cache: false,
                dataType: 'json',
                success: function (res) {
                    alert('删除成功');
                    window.location.href = '/';
                },
                error: function (err) {
                    alert(err.responseJSON.error);
                }
            })
        } else {
            return false;
        }
    })

    //点击用户名获取个人主题列表
    $(document).on('click', '.post-author .username', (that) => {
        let author = that.currentTarget.innerText;
        // console.log(that.currentTarget.innerText);
        ul.html('');//防止数据重复渲染
        initTopicsList(author);
    })

    //点击主题标题进入详情页
    $(document).on('click', '.post-content .title', (that) => {
        let mid = that.currentTarget.title;
        //使用escape和unescape加密解密，防止文本出现js保留字导致出错。
        let item = unescape($('.item-' + mid).val());
        sessionStorage.setItem('item', item);
        window.location.href = '/detail/' + mid;
    })

    //显示用户自己的编辑|删除按钮
    function showOperation(uid, mid) {
        let session_uid = $('.message-form input[name=uid]').val();
        if (session_uid == uid) {
            $('.operator-' + uid).replaceWith(`<a href="/getmodifytopic/` + mid + `" class="operation edit">编辑</a><span class="operation delete" title="` + mid + `">删除</span>`);
        }
    }

    //日期处理
    function timeFormat(timestamp) {
        let d = new Date(timestamp);
        let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return date;
    }
})
