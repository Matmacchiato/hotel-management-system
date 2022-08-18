$(function () {
    $('#update').click(
        function (e) {
            var data = $('#updateForm').serializeArray();
            $.post({
                url: 'resouces/updateHotel',
                dataType: 'json',
                data: data,
                beforeSend: function () {
                    $('#updateModal').modal('hide');
                    $('#loadingUpdateToast').addClass('show').removeClass('hide');
                    $('#update').prop('disabled', true);
                },
                // abortOnRetry:true;
                
                success: function (res) {
                    $('#loadingUpdateToast').toggleClass(['show', 'hide']);
                    if (res.errorCode == 0) {
                        $('#updateSuccessToast').toast('show');
                        var $td = $('td:contains(' + data[0].value + ')');
                        $td.siblings('.name').text(data[1].value);
                        $td.siblings('.addr').text(data[2].value);
                        $td.siblings('.mobile').text(data[3].value);
                    } else {
                        $('#updateFailToast').toast('show');
                    }
                    $('#update').prop('disabled', false);
                },
                error: function () {
                    $('#loadingUpdateToast').toggleClass(['show', 'hide']);
                    $('#updateFailToast').toast('show');
                    $('#update').prop('disabled', false);
                },
            })
        })
})

function getHotels(page) {
    $.post({
        url: 'resouces/hotel',
        dataType: 'json',
        beforeSend: function () {
            $('#loadingToast').addClass('show').removeClass('hide');
        },
        data: {
            page: page,
            test: 2
        },
        success: function (res) {
            if (res.errorCode == 0) {
                $('#loadingToast').toggleClass(['show', 'hide']);
                $('tbody tr').slice(1).remove();
                var hotels = res.hotels;
                var length = res.length;
                var pages = Math.ceil(length / 5);
                if (pages > 1) {
                    var $pageItems = $('.page-item');
                    $pageItems.slice(2, $pageItems.length - 1).remove();
                    var $nextItem = $pageItems.last();
                    var $firstPageItem = $pageItems.eq(1);
                    var $pageItemClone = null;
                    for (var j = 2; j <= pages; j++) {
                        $pageItemClone = $firstPageItem.clone();
                        $pageItemClone.children('a').text(j);
                        $nextItem.before($pageItemClone);
                    }
                }
                $('.page-item').removeClass('active');
                $('.page-item:contains(' + page + ')').addClass('active');
                for (var i = 0; i < hotels.length; i++) {
                    hotel = hotels[i];
                    var $tr = $('<tr></tr>');
                    $tr.append($('<th class="align=middle"><input type="checkbox"/></th>'));
                    $tr.append($('<th></th>').text((page - 1) * 5 + i + 1));
                    $tr.append($('<td></td>').text(hotel.id).addClass('id'));
                    $tr.append($('<td></td>').text(hotel.name).addClass('name'));
                    $tr.append($('<td></td>').text(hotel.addr).addClass('addr'));
                    $tr.append($('<td></td>').text(hotel.mobile).addClass('mobile'));
                    $tr.append($('<td></td>').html('<big class="mr-3"><a title="修改" data-toggle="modal" data-target="#updateModal" class="text-waring bi-wrench"></a></big><big class="mr-3"><a title="删除" data-toggle="modal" data-target="#delModal" class="text-danger bi-trash-fill"></a></big>'));
                    $('table').append($tr);
                }
            }
        },
        error: function () {
            $('#loadingToast').toggleClass(['show', 'hide']);
            $('#loadingFailToast').toast('show');
        },
    })
}

$(function () {
    $('tbody').on('click', '[data-target="#updateModal"]', function (e) {
        var $parentsTD = $(e.target).parents('td');
        $('#id').val($parentsTD.siblings('.id').text());
        $('#name').val($parentsTD.siblings('.name').text());
        $('#addr').val($parentsTD.siblings('.addr').text());
        $('#mobile').val($parentsTD.siblings('.mobile').text());
    })
})

$(function () {
    var rightOffset = ($('table').width() - 350) / 2;
    $('.toast').css('right', rightOffset);
    getHotels(1);
})
$(function () {
    $('.pagination').click(
        function (e) {
            var page = $(e.target).text();
            getHotels(page);
        })
})