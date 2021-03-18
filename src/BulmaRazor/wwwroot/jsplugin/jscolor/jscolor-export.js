;

export function init(selector, options) {

    // options.onChange = function () {
    //     console.log(this);
    //     //this is jscolor instance
    // }
    // options.onInput = function () {
    //     console.log(this);
    //     //this is jscolor instance
    //     // DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"onInput",[datepicker.data.value()]);
    // }
    var obj = new JSColor(selector, options);
    return obj;
}