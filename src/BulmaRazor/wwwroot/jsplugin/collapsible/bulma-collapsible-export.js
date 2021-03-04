let bulmaCollapsible = window.bulmaCollapsible;

export function attach(selector) {
    let instances = bulmaCollapsible.attach(selector);
    instances.forEach(function (instance) {
        instance.on('before:expand', function ($this) {
            // console.log($this);
            DotNet.invokeMethodAsync("BulmaRazor","JSCallback",$this.element.id,"before:expand",[]);
        });

        instance.on('after:expand', function ($this) {
            DotNet.invokeMethodAsync("BulmaRazor","JSCallback",$this.element.id,"after:expand",[]);
        });
        instance.on('before:collapse', function ($this) {
            DotNet.invokeMethodAsync("BulmaRazor","JSCallback",$this.element.id,"before:collapse",[]);
        });
        instance.on('after:collapse', function ($this) {
            // console.log($this);
            DotNet.invokeMethodAsync("BulmaRazor","JSCallback",$this.element.id,"after:collapse",[]);
        });
    });
    return instances;
}


