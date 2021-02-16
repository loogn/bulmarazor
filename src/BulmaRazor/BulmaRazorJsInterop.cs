using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor
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

        public async ValueTask<bool> GetOptionSelected(ElementReference element)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<bool>("getOptionSelected", element);
        }

        public async ValueTask<object> SetOptionSelected(ElementReference element,bool val)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("setOptionSelected", element,val);
        }

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
