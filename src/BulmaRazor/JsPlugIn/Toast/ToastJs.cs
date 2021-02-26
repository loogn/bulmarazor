using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    /// <summary>
    /// https://github.com/rfoel/bulma-toast
    /// </summary>
    public class ToastJs : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        public ToastJs(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/jsplugin/toast.js").AsTask());
        }

        public async ValueTask Toast(ToastOptions options)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("toast", options.ToParams());
        }

        public async ValueTask SetDefaults(ToastConfig config)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("setDefaults", config);
        }

        public async ValueTask ResetDefaults()
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("resetDefaults");
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