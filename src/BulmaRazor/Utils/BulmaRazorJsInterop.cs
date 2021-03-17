using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    public class BulmaRazorJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        private readonly Lazy<Task<IJSObjectReference>> toastModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> collapsibleModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> tagsInputModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> tuiEditorModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> fdatepickerModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> jsColorModuleTask;


        public BulmaRazorJsInterop(IJSRuntime jsRuntime)
        {
            //公共js
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/JsInterop.js").AsTask());

            //toast
            toastModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/toast.min.js").AsTask());

            tagsInputModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/tagsinput.min.js").AsTask());

            //collapsible
            collapsibleModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/collapsible.min.js").AsTask());

            //collapsible
            tuiEditorModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/tuieditor.min.js").AsTask());


            //fdatepickerModuleTask
            fdatepickerModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/fdatepicker.min.js").AsTask());

            //jscolor
            jsColorModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/jscolor.min.js").AsTask());
        }

        //fdatepicker
        public async ValueTask<IJSObjectReference> DatePickerInit(string id, DatePickerOptions options)
        {
            options ??= new DatePickerOptions();
            var module = await fdatepickerModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("init", "#" + id, options.ToParams());
        }

        public async ValueTask DatePickerShow(string id)
        {
            var module = await fdatepickerModuleTask.Value;
            await module.InvokeVoidAsync("show", "#" + id);
        }

        public async ValueTask DatePickerHide(string id)
        {
            var module = await fdatepickerModuleTask.Value;
            await module.InvokeVoidAsync("hide", "#" + id);
        }

        // 折叠面板
        public async ValueTask<IJSObjectReference> CollapsibleAttach(string selector)
        {
            var module = await collapsibleModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", selector);
        }

        // tagsinput
        public async ValueTask<IJSObjectReference> TagsInputAttach(string selector, TagsInputOptions options = null)
        {
            var module = await tagsInputModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", selector, options?.ToParams());
        }

        // 吐司
        public async ValueTask ToastShow(ToastOptions options)
        {
            var module = await toastModuleTask.Value;
            await module.InvokeVoidAsync("toast", options.ToParams());
        }

        public ValueTask ToastShow(string message)
        {
            return ToastShow(new ToastOptions() {Message = message});
        }

        //editor
        public async ValueTask<IJSObjectReference> TuiEditorInit(TuiEditorOptions options)
        {
            var module = await tuiEditorModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("initEditor", options.ToParams());
        }

        // js color
        public async ValueTask<IJSObjectReference> JSColorInit(string id, ColorPickerOptions options)
        {
            options ??= new ColorPickerOptions();
            var module = await jsColorModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("init", "#" + id, options.ToParams());
        }

        #region 公共

        public async ValueTask Toggle(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("Toggle", id, speed);
        }

        public async ValueTask SlideToggle(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideToggle", id, speed);
        }

        public async ValueTask SlideUp(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideUp", id, speed);
        }

        public async ValueTask SlideDown(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideDown", id, speed);
        }


        public async ValueTask BindClickWithoutSelf(string id, string selector = null)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("BindClickWithoutSelf", id, selector);
        }

        public async ValueTask<string> Prompt(string message, string defValue)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<string>("Prompt", message, defValue);
        }

        public async ValueTask<bool> Confirm(string message)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<bool>("Confirm", message);
        }

        public async ValueTask Alert(string message)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("Alert", message);
        }

        public async ValueTask Log(params object[] args)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("Log", args);
        }

        public async ValueTask SetIndeterminate(ElementReference ele, bool flag)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SetIndeterminate", ele, flag);
        }

        public async ValueTask<bool> GetIndeterminate(ElementReference ele)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<bool>("GetIndeterminate", ele);
        }

        #endregion


        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }


            if (toastModuleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }

            if (tuiEditorModuleTask.IsValueCreated)
            {
                var module = await tuiEditorModuleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}