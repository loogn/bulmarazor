let BulmaTagsInput = window.BulmaTagsInput;

export function attach(selector) {

    let instance = new BulmaTagsInput(selector);
    
    window.tagsinput=instance;
    instance.on('after.add', function (data) {
        //console.log('after.add',data);
        DotNet.invokeMethodAsync("BulmaRazor","JSCallback",instance.element.id,"after.add",[instance.value]);
    });
    return instance;
}
