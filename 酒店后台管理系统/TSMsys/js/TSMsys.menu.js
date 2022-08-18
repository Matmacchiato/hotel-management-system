$(function () {
    var url = document.location.href;
    var array = url.split('/');
    var index = array.indexOf('TSMsys');
    var navName = array[index + 1];
    $('#' + navName).children('.collapse').addClass('show').prev().removeClass('bi-caret-right-fill').addClass('bi-caret-down-fill');
    $('.collapse').on('show.bs.collapse hide.bs.collapse', function () {
        var $this = $(this);
        $(this).prev().toggleClass(['bi-caret-right-fill', 'bi-caret-down-fill'])
    })
})

$(function () {
    var contentHtml = '<div class="card border-0" style="width: 18rem;">'
        + '<div class="card-body">'
        + '<h5 class="card-title">星级酒店</h5>'
        + '<a href="../resources/showHotels.html" class="card-link">酒店维护</a>'
        + '<a href="#" class="card-link">添加酒店</a>'
        + '</div>'
        + '</div>'
        + '<div class="card border-0" style="width: 18rem;">'
        + '<div class="card=body">'
        + '<div class="card-body">'
        + '<h5 class="card-title">民宿</h5>'
        + '<a href="#" class="card-link">民宿维护</a>'
        + '<a href="#" class="card-link">添加民宿</a>'
        + '</div>'
        + '</div>';
    $('#hotelManagement').popover({
        content: contentHtml,
        html: true
    }).children().click(
        function (e) {
            e.preventDefault();
        }
    )
})