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

        public BulmaRazorJsInterop(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/BulmaRazor/JsInterop.js").AsTask());
        }
        public async ValueTask<string> Prompt(string message,string defValue)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<string>("Prompt", message,defValue);
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
        }
    }
}
