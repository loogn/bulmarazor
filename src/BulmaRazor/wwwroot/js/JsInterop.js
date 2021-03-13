// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.


export function BindClickWithoutSelf(id, selector) {
    $(document).click(function (e) {
        if (e.target.id == id || $(e.target).parents("#" + id).length > 0)
            return;

        if (selector) {
            let self = false;
            $(selector).each(function (index, ele) {
                if (ele === e.target) {
                    self = true;
                }
            });
            if (self) return;

            if ($(e.target).parents(selector).length > 0)
                return;
        }

        DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", id, "clickWithoutSelf");
    })
}

export function Toggle(id, speed) {
    $("#" + id).toggle(speed);
}

export function SlideToggle(id, speed) {
    $("#" + id).slideToggle(speed);
}

export function SlideDown(id, speed) {
    $("#" + id).slideDown(speed);
}

export function SlideUp(id, speed) {
    $("#" + id).slideUp(speed);
}

export function Prompt(message, defaultValue) {
    return prompt(message, defaultValue);
}

export function Alert(message) {
    alert(message);
}

export function Confirm(message) {
    return confirm(message);
}

export function Log() {
    console.log(Array.from(arguments));
}

export function SetIndeterminate(ele, flag) {
    ele.indeterminate = flag;
}

export function GetIndeterminate(ele) {
    return ele.indeterminate ?? false;
}


// export function getOptionSelected(element) {
//   return element.selected;
// }
// export function setOptionSelected(element, val) {
//   element.selected = val;
// }

//
// export function getElementById(id) {
//   return window.document.getElementById(id);
// }
// export function getElementsByClassName(classNames) {
//   return window.document.getElementsByClassName(classNames);
// }
// export function getElementsByTagName(tagName) {
//   return window.document.getElementsByTagName(tagName);
// }
// export function scrollTo(element, x, y) {
//   element.scrollTo(x, y);
// }
