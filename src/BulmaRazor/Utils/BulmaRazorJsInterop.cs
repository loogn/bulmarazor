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
        private readonly Lazy<Task<IJSObjectReference>> calendarModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> toastModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> collapsibleModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> tagsInputModuleTask;

        public BulmaRazorJsInterop(IJSRuntime jsRuntime)
        {
            //公共js
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/JsInterop.js").AsTask());

            //calendar
            calendarModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/calendar.min.js").AsTask());

            //toast
            toastModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/toast.min.js").AsTask());

            tagsInputModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/tagsinput.min.js").AsTask());

            //collapsible
            collapsibleModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/js/collapsible.min.js").AsTask());
        }

        // 日历
        public async ValueTask<IJSObjectReference> CalendarAttach(string id, CalenderOptions options = null)
        {
            options ??= new CalenderOptions();
            var module = await calendarModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("attach", "#" + id,
                options.ToParams()
            );
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


        #region 公共

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

        #endregion


        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }

            if (calendarModuleTask.IsValueCreated)
            {
                var module = await calendarModuleTask.Value;
                await module.DisposeAsync();
            }

            if (toastModuleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}