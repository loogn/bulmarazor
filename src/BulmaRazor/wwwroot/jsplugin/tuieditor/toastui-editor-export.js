export function initEditor(options) {
    options.el = document.getElementById(options.elid);
    options.events = {
        load: function () {
            DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", options.elid, "load");
        },
        change: function () {
            DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", options.elid, "change");
        },
        stateChange: function () {
            DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", options.elid, "stateChange");
        },
        focus: function () {
            DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", options.elid, "focus");
        },
        blur: function () {
            DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", options.elid, "blur");
        }
    }
    let editor = new toastui.Editor.factory(options);
    return editor;
}
