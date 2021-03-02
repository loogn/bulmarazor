using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    // This class provides an example of how JavaScript functionality can be wrapped
    // in a .NET class for easy consumption. The associated JavaScript module is
    // loaded on demand when first needed.
    //
    // This class can be registered as scoped DI service and then injected into Blazor
    // components for use.

    public class BulmaRazorJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;
        private readonly Lazy<Task<IJSObjectReference>> calendarModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> toastModuleTask;
        private readonly Lazy<Task<IJSObjectReference>> collapsibleModuleTask;

        public BulmaRazorJsInterop(IJSRuntime jsRuntime)
        {
            //公共js
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/JsInterop.js").AsTask());

            //calendar
            calendarModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/jsplugin/bulma-calendar.js").AsTask());

            //toast
            toastModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/jsplugin/toast.js").AsTask());

            collapsibleModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/jsplugin/bulma-collapsible.min.js").AsTask());
        }

        public async ValueTask<IJSObjectReference> CalendarAttach(string guid, CalenderOptions options)
        {
            var module = await calendarModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("bulmaCalendar.attach", "#" + guid,
                options ?? new CalenderOptions()
            );
        }
        
        public async ValueTask<IJSObjectReference> CollapsibleAttach(string selector)
        {
            var module = await collapsibleModuleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("bulmaCollapsible.attach", selector);
        }
        #region toast

        public async ValueTask ToastShow(ToastOptions options)
        {
            var module = await toastModuleTask.Value;
            await module.InvokeVoidAsync("toast", options.ToParams());
        }

        public async ValueTask ToastSetDefaults(ToastConfig config)
        {
            var module = await toastModuleTask.Value;
            await module.InvokeVoidAsync("setDefaults", config);
        }

        public async ValueTask ToastResetDefaults()
        {
            var module = await toastModuleTask.Value;
            await module.InvokeVoidAsync("resetDefaults");
        }

        #endregion


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

        // public async ValueTask<bool> GetOptionSelected(ElementReference element)
        // {
        //     var module = await moduleTask.Value;
        //     return await module.InvokeAsync<bool>("getOptionSelected", element);
        // }
        //
        // public async ValueTask SetOptionSelected(ElementReference element, bool val)
        // {
        //     var module = await moduleTask.Value;
        //     await module.InvokeVoidAsync("setOptionSelected", element, val);
        // }

        // public async ValueTask<ElementReference> GetElementById(string id)
        // {
        //     var module = await moduleTask.Value;
        //     return await module.InvokeAsync<ElementReference>("getElementById", id);
        // }
        //
        // public async ValueTask<List<ElementReference>> GetElementsByClassName(string classNames)
        // {
        //     var module = await moduleTask.Value;
        //     return await module.InvokeAsync<List<ElementReference>>("getElementsByClassName", classNames);
        // }
        //
        // public async ValueTask<List<ElementReference>> GetElementsByTagName(string tagName)
        // {
        //     var module = await moduleTask.Value;
        //     return await module.InvokeAsync<List<ElementReference>>("getElementsByTagName", tagName);
        // }
        //
        // public async ValueTask ScrollTo(ElementReference element, double x, double y)
        // {
        //     var module = await moduleTask.Value;
        //     await module.InvokeVoidAsync("scrollTo", element, x, y);
        // }

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