//目前无用，只用了css，js部分使用C#实现了
let bulmaQuickview=window.bulmaQuickview;

export function attach(selector){
    let instances=bulmaQuickview.attach(selector);
    if(instances.length===0){
        return null;
    }
    let instance=instances[0];
    instance.on('quickview:show', function (ele,quickvie) {
        //DotNet.invokeMethodAsync("BulmaRazor","JSCallback",datepicker.data.element.id,"select",[datepicker.data.value()]);
    });
    return instance;
    
}
