// $(function () {
//     $(document).click(function (e) {
//         DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", "document", "click",{targetId:e.target.id});
//     })
// });

window.BulmaRazor = {
    Log: function (args) {
        console.log(args);
    },
    Alert: function (message) {
        alert(message);
    },
    GetOptionSelected: function (element) {
        return element.selected;
    },
    SetOptionSelected: function (element, val) {
        element.selected = val;
    }
}