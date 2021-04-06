
;window.BulmaRazor = {
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
    },
    NewJsColor(selector,options){
        return new JSColor(selector,options);
    }
    
};