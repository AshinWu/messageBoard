$(function () {
    window.onload = init();
    
    $('.go-back').click(() => {
        window.history.back();
    })

    function init() {
        let item = JSON.parse(sessionStorage.getItem('item'));
        $('.center-container .head-title').text(item.mi_title);
        $('.center-container .time').text('最后修改：'+timeFormat(item.mi_modify_time));
        $('.center-container .author').text('发布者：'+item.author);
        $('.center-container .detail-main').text(item.mi_content);
        $('.center-container .create-time').text('创建时间：' + timeFormat(item.mi_create_time));
    }

    //日期处理
    function timeFormat(timestamp) {
        let d = new Date(timestamp);
        let date = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return date;
    }
})