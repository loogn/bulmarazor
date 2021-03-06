//calendar modal

let bulmaCalendar = window.bulmaCalendar;

export function attach(selector, options) {
    let instances = bulmaCalendar.attach(selector, options);
    if (instances.length === 0) {
        return null;
    }
    let instance = instances[0];
    instance.on('select', function (datepicker) {
        console.log('select');
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", datepicker.data.element.id, "select",
            {"value": datepicker.data.value()});
    });
    instance.on('hide', function (datepicker) {
        console.log('hide');
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", datepicker.data.element.id, "hide");
    });

    instance.on('show', function (datepicker) {
        console.log('show');
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", datepicker.data.element.id, "show");
    });
    instance.on('validate', function (datepicker) {
        console.log('validate');
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", datepicker.data.element.id, "validate", {"value": datepicker.data.value()});
    });
    instance.on('clear', function (datepicker) {
        console.log('clear');
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", datepicker.data.element.id, "clear");
    });

    instance.on('select:start', function (datepicker) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", datepicker.data.element.id, "select:start", {"value": datepicker.data.value()});
    });


    return instance;
}


// date	Set date
// startDate	Se start date
// endDate	Set end date