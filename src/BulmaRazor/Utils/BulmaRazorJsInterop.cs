using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    public class BulmaRazorJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;
        private readonly Lazy<Task<IJSObjectReference>> toastModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> collapsibleModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> tagsInputModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> tuiEditorModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> fdatepickerModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> jsColorModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> wangEditorModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> carouselModuleTask;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="jsRuntime"></param>
        public BulmaRazorJsInterop(IJSRuntime jsRuntime)
        {
            //公共js
            moduleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/JsInterop.js").AsTask());

            //toast
            toastModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/toast.min.js").AsTask());

            tagsInputModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/tagsinput.min.js").AsTask());

            //collapsible
            collapsibleModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/collapsible.min.js").AsTask());

            //tuiEditor
            tuiEditorModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/tuieditor.min.js").AsTask());

            //fdatepickerModuleTask
            fdatepickerModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/fdatepicker.min.js").AsTask());

            //jscolor
            jsColorModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/jscolor.min.js").AsTask());

            //wangEditor
            wangEditorModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/wangEditor.min.js").AsTask());

            //carousel
            carouselModuleTask = new Lazy<Task<IJSObjectReference>>(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/carousel.min.js").AsTask());
        }

        //fdatepicker
        internal async ValueTask<IJSObjectReference> DatePickerInit(string id, DatePickerOptions options)
        {
            options ??= new DatePickerOptions();
            var module = await fdatepickerModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("init", "#" + id, options.ToParams());
        }

        internal async ValueTask DatePickerShow(string id)
        {
            var module = await fdatepickerModuleTask.Value;
            await module.InvokeVoidAsync("show", "#" + id);
        }

        internal async ValueTask DatePickerHide(string id)
        {
            var module = await fdatepickerModuleTask.Value;
            await module.InvokeVoidAsync("hide", "#" + id);
        }

        // 折叠面板
        internal async ValueTask<IJSObjectReference> CollapsibleAttach(string selector)
        {
            var module = await collapsibleModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", selector);
        }

        // tagsinput
        internal async ValueTask<IJSObjectReference> TagsInputAttach(string selector, TagsInputOptions options = null)
        {
            var module = await tagsInputModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", selector, options?.ToParams());
        }

        // 吐司
        internal async ValueTask ToastShow(ToastOptions options)
        {
            var module = await toastModuleTask.Value;
            await module.InvokeVoidAsync("toast", options.ToParams());
        }

        internal ValueTask ToastShow(string message)
        {
            return ToastShow(new ToastOptions() {Message = message});
        }

        //markdown editor
        internal async ValueTask<IJSObjectReference> TuiEditorInit(TuiEditorOptions options)
        {
            var module = await tuiEditorModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("initEditor", options.ToParams());
        }

        //wangeditor
        internal async ValueTask<IJSObjectReference> WangEditorInit(string id, WangEditorOptions options)
        {
            var module = await wangEditorModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("init", id, options.ToParams());
        }

        // js color
        internal async ValueTask<IJSObjectReference> JSColorInit(string id, ColorPickerOptions options)
        {
            options ??= new ColorPickerOptions();
            var module = await jsColorModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("init", "#" + id, options.ToParams());
        }

        // Carousel
        internal async ValueTask<IJSObjectReference> CarouselAttach(string id, CarouselOptions options)
        {
            var module = await carouselModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", id, options.ToParams());
        }

        #region 公共

        internal async ValueTask Toggle(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("Toggle", id, speed);
        }

        internal async ValueTask SlideToggle(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideToggle", id, speed);
        }

        internal async ValueTask SlideUp(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideUp", id, speed);
        }

        internal async ValueTask SlideDown(string id, object speed)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("SlideDown", id, speed);
        }


        internal async ValueTask BindClickWithoutSelf(string id, string selector = null)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("BindClickWithoutSelf", id, selector);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="defValue"></param>
        /// <returns></returns>
        public async ValueTask<string> Prompt(string message, string defValue)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<string>("Prompt", message, defValue);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async ValueTask<bool> Confirm(string message)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<bool>("Confirm", message);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async ValueTask Alert(string message)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("Alert", message);
        }

        #endregion


        private async Task DisposeModule(params Lazy<Task<IJSObjectReference>>[] moduleTasks)
        {
            foreach (var task in moduleTasks)
            {
                if (!task.IsValueCreated) continue;

                var module = await task.Value;
                await module.DisposeAsync();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async ValueTask DisposeAsync()
        {
            await DisposeModule(
                collapsibleModuleTask,
                tagsInputModuleTask,
                fdatepickerModuleTask,
                jsColorModuleTask,
                wangEditorModuleTask,
                carouselModuleTask,
                moduleTask,
                toastModuleTask,
                tuiEditorModuleTask);
        }
    }
}