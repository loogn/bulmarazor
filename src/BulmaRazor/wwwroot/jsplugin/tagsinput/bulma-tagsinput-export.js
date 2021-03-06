let BulmaTagsInput = window.BulmaTagsInput;

export function attach(selector, options) {

    let instance = new BulmaTagsInput(selector, options);

    window.tagsinput = instance;
    instance.on('before.add', function (item) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "before.add",
            {"item": item, "value": instance.value}
        );
        return item;
    });
    instance.on('after.add', function (data) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "after.add",
            {"item": data.item, "value": instance.value}
        );
    });

    instance.on('before.remove', function (item) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "before.remove",
            {"item": item, "value": instance.value}
        );
        return true;
    });
    instance.on('after.remove', function (item) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "after.remove",
            {"item": item, "value": instance.value});
    });

    instance.on('before.flush', function (items) {
        console.log('before.flush', items);
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "before.flush",
            {"items": items, "value": instance.value}
        );
        return true;
    });
    instance.on('after.flush', function (items) {
        console.log('after.flush', items);
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", instance.element.id, "after.flush",
            {"items": items, "value": instance.value}
        );
    });
    return instance;
}
