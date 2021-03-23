;export function init(id,options) {
    const editor = new window.wangEditor('#' + id);
    
    Object.assign(editor.config,options);
    
    editor.config.onchange = function (newHtml) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", id, "onchange",{html:newHtml});
    };
    editor.config.onblur = function (newHtml) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallbackWithParams", id, "onblur",{html:newHtml});
    }
    editor.config.onfocus = function (newHtml) {
        DotNet.invokeMethodAsync("BulmaRazor", "JSCallback", id, "onfocus");
    }

    // // 插入网络图片的回调
    // editor.config.linkImgCallback = function (src, alt, href) {
    //     console.log('图片 src ', src)
    //     console.log('图片文字说明', alt)
    //     console.log('跳转链接', href)
    // }
    // // 自定义检查插入视频的回调
    // editor.config.onlineVideoCallback = function (video) {
    //     // 自定义回调内容，内容成功插入后会执行该函数
    //     console.log('插入视频内容', video)
    // }

    // // 自定义检查插入的链接
    // editor.config.linkCheck = function (text, link) {
    //     // 以下情况，请三选一
    //     // 1. 返回 true ，说明检查通过
    //     return true
    //
    //     // // 2. 返回一个字符串，说明检查未通过，编辑器会阻止链接插入。会 alert 出错误信息（即返回的字符串）
    //     // return '链接有 xxx 错误'
    //
    //     // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止链接插入。
    //     // 此处，你可以自定义提示错误信息，自由发挥
    // }

    // // 自定义检查插入图片的链接
    // // 参数中的imgSrc、alt、href分别代表图片地址、图片文本说明和跳转链接
    // // 后面两个参数是可选参数
    // editor.config.linkImgCheck = function (imgSrc, alt, href) {
    //     // 以下情况，请三选一
    //
    //     // 1. 返回 true ，说明检查通过
    //     return true
    //
    //     // // 2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
    //     // return '图片 src 有 xxx 错误'
    //
    //     // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入。
    //     // 此处，你可以自定义提示错误信息，自由发挥
    // }

    // // 自定义检查插入视频的链接
    // editor.config.onlineVideoCheck = function(video){
    //     // 编辑器会根据返回的内容做校验：比如以下几种情况
    //
    //     // 1. 返回 true ，说明检查通过
    //     return true
    //
    //     // 2. 返回一个字符串，说明检查未通过，编辑器会阻止视频插入。会 alert 出错误信息（即返回的字符串）
    //     // return '插入的视频 有 xxx 错误'
    //
    //     // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止视频插入。
    //     // 此处，你可以自定义提示错误信息，自由发挥
    // }
    
    // // 配置粘贴文本的内容处理
    // editor.config.pasteTextHandle = function (pasteStr) {
    //     // 对粘贴的文本进行处理，然后返回处理后的结果
    //     return pasteStr + '巴拉巴拉'
    // }
    
    editor.create();
    return editor;
}