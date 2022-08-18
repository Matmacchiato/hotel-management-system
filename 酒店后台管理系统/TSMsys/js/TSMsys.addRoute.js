$(function () {
    var $nextBtn = $(':button:contains(下一步)');
    $nextBtn.click(
        function () {
            var index = $nextBtn.index($(this));
            switch (index) {
                case 0:
                    if (document.getElementById('infoForm').checkValidity() === false) {
                        return false;
                    }
                    var days = $('#days').val();
                    var $templateClone = $('#scheduling .card').clone();
                    var $form = $('#scheduling form');
                    for (var i = 2; i <= days; i++) {
                        $templateClone.children('h6').attr('data-target', '#day' + i).text('第' + i + '天').next().attr('id', 'day' + i);
                        $form.append($templateClone);
                        $templateClone = $templateClone.clone();
                    }
                    break;
            }
            $('.nav-tabs .nav-link').eq(index + 1).removeClass('disabled').tab('show');
        }
    )
})
$(function () {
    var $travel = $('[name="travel"]');
    $travel.click(function () {
        if ($travel.filter(':checked').length == 0) {
            $travel.attr('required', 'required');
            $('#travelTips').show();
        } else {
            $travel.removeAttr('required');
            $('#travelTips').hide();
        }
    })
})

$(function () {
    // 恢复删除 
    var $detach;
    var $alert = $('#recoverAlert');
    $alert.hide();
    $('#recoverAlert .close').click(function (e) {
        e.preventDefault();
        $alert.finish();
    })
    $('#recover').click(function () {
        var index;
        if ($detach == null) {
            $alert.show();
            var offset = $alert.offset();
            offset.left += 200;
            $alert.offset(offset);
            $alert.animate({
                left: '-=200px'
            }, 2000).delay(5000).hide('show')
        } else {
            $detach.each(function () {
                var $this = $(this);
                index = $this.data('index');
                $this.hide();
                $after = $('#inputTable').find('tr').eq(index);
                if ($after.length == 0) {
                    $('#inputTable').append($this)
                } else {
                    $this.insertBefore($after);
                }
                $this.fadeIn('show');
            })
            $detach = null;
        }
    })
    $(document).keydown(function (e) {
        if (e.ctrlkey && e.which == 90) {
            $('#recover').trigger('click');
        }
    })

    // 批量删除
    $('#delete').click(function () {
        $checkedTrs = $('#inputTable tr').has(':checked');
        $checkedTrs.each(function () {
            $(this).data('index', $(this).index());
        })
        $datach = $checkedTrs.detach();
        $detach.each(function () {
            console.log($(this).data('index'));
        })
    })

    var $checkAll = $('#checkAll');
    $checkAll.click(function () {
        $('#inputTable :checkbox').prop('checked', $(this).prop('checked'));
    });
    $('#inputTable').on('click', ':checkbox', function () {
        if ($('#inputTable :checkbox').length == $('#inputTable :checked').length) {
            $checkAll.prop('checked', true);
        } else {
            $checkAll.prop('checked', false);
        }
    })
    $('#add').click(function () {
        var itemHTML =
            '<tr>'
            + '<td class="align-middle">'
            + '<input type="checkbox" class="ml-2">'
            + '</td>'
            + '<td>'
            + '<input type="text" class="form-control mx-auto" style="max-width: 100px;">'
            + '</td>'
            + '<td>'
            + '<input type="date" class="form-control mx-auto" style="max-width: 220px;">'
            + '</td>'
            + '</tr>'
        $('#inputTable').append($(itemHTML));
    })
})

