function flipNum(number){
    this.init(number)
}
flipNum.prototype = {

    init: function(number){
        var sHtml = ''
            ,totalNum = 10
            ,$numBox = $('.js-numBox')
            ,aNumber = number.split("").reverse()
            ,ctx = this;

        $.each(aNumber, function(i,item){
            var virtualHtml = '';
            for(var k = 0; k < totalNum; k++ ){
                virtualHtml += '<span>'+k+'</span>';
            }
            var liHtml = ctx.numberTemplate().replace('{{realityNum}}', item).replace('{{virtualNum}}', virtualHtml);
            sHtml = !((i+1) % 3) ? ctx.commaTemplate() + liHtml + sHtml: liHtml + sHtml;

        })
        $numBox.html(sHtml);
        ctx.updateData();


    },
    updateData: function(number){
        var $effectBox = $('.ptDataInner')
            ,$animate_h = $effectBox.find('li').height()
            ,$animateEl = $('.scrollNumBox');

        if(number){
            var aNumber = number.split('');
            $.each($animateEl, function(i, item){
                var $item = $(item)
                    ,$virtualNum = $item.find('.virtualNum')
                    ,realitynum = $virtualNum.data('realitynum')
                    ,curNum = parseInt($(this).css('top'),10) / $animate_h
                    ,aNumberI = aNumber[i];
                if(aNumberI == realitynum){
                    return;
                }else{
                    $item.animate({
                        top: -$animate_h * aNumberI + 'px'
                    }, 1000, function() {
                        $virtualNum.data('realitynum', aNumberI);
                    });
                }

            })
        }else{
            $.each($animateEl, function(i, item){
                var $item = $(item)
                    ,realitynum = $item.find('.virtualNum').data('realitynum')
                    ,curNum = parseInt($(this).css('top'),10) / $animate_h;
                $item.animate({
                    top: -$animate_h * realitynum + 'px'
                }, 1000, function() {
                    return;
                });
            })
        }
    },
    numberTemplate: function(){
        return '<li>\
                <div class="scrollNumBox">\
                    <div class="virtualNum" data-realitynum = "{{realityNum}}">{{virtualNum}}</div>\
                </div>\
                </li>';
    },
    commaTemplate: function(){
        return '<li class="comma">,</li>';
    }
}