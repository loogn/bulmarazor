
//calendar modal

let bulmaCalendar = window.bulmaCalendar;

export function attach(selector,options){
    let instances=bulmaCalendar.attach(selector,options);
    if(instances.length===0){
        return null;
    }
    let instance=instances[0];
    instance.on('select', function (datepicker) {
        // console.log("select值："+datepicker.data.value());
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"select",[datepicker.data.value()]);
    });
    instance.on('hide', function (datepicker) {
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"hide",[datepicker.data.value()]);
    });
    instance.on('ready', function (datepicker) {
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"ready",[datepicker.data.value()]);
    });
    instance.on('show', function (datepicker) {
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"show",[datepicker.data.value()]);
    });
    // instance.on('select:start', function (datepicker) {
    //     DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"select:start",[datepicker.data.value()]);
    // });
    return instance;
}