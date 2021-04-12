// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.


export function initBackTop(id, target, visibilityHeight, time) {

    // console.log('调用了initBackTop', id, target, visibilityHeight, time);
    let $target = null;
    let hasTarget = false;
    if (target) {
        hasTarget = true;
        $target = $(target);
    } else {
        $target = $(document);
    }
    $target.scroll(function () {
        let top = $target.scrollTop();
        if (top > visibilityHeight) {
            $("#" + id).show();
        } else {
            $("#" + id).hide();
        }
    });
    if ($target.scrollTop() > visibilityHeight) {
        $("#" + id).show();
    }
    
    $("#" + id).click(function () {
        if (hasTarget) {
            $target.animate({scrollTop: 0}, time);
        } else {
            if ($("html").scrollTop() !== 0) {
                $("html").animate({scrollTop: 0}, time);
            } else {
                $("body").animate({scrollTop: 0}, time);
            }
        }
    });
}


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