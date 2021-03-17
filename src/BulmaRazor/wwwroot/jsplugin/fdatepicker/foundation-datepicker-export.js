/**
 * js文件修改了setDatesDisabled方法，
 * css文件 dropdown-menu 重命名 fdropdown-menu
 */

/**
 * Simplified Chinese translation for foundation-datepicker
 * Yuan Cheung <advanimal@gmail.com>
 */
;(function ($) {
    $.fn.fdatepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        today: '今天'
    };
}(jQuery));


export function init(selector, options) {
    
    let obj= $(selector).fdatepicker(options);
    obj.on('show',function(){
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",selector,"show");
    }).on('hide',function(){
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",selector,"hide");
    }).on('changeDate',function(e){
        
        var dict={date:e.currentTarget.value};
        console.log(dict);
        DotNet.invokeMethodAsync("BulmaRazor","JSCallbackWithParams",selector,"changeDate",dict);
    });
    return obj;
}

export function show(selector) {
    $(selector).fdatepicker('show');
}
export function hide(selector) {
    $(selector).fdatepicker('hide');
}
