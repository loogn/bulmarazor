using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    public class CalendarJs : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        public CalendarJs(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./_content/BulmaRazor/jsplugin/bulma-calendar.js").AsTask());
        }

        public async ValueTask<IJSObjectReference> Attach(ElementReference input, CalenderOptions options)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<IJSObjectReference>("bulmaCalendar.attach", input,
                options ?? new CalenderOptions()
            );
        }
        
        public async ValueTask SetDefaults(ToastConfig config)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("setDefaults", config);
        }
        

        // public async ValueTask SetDefaults(ToastConfig config)
        // {
        //     var module = await moduleTask.Value;
        //     await module.InvokeVoidAsync("setDefaults", config);
        // }
        //
        // public async ValueTask ResetDefaults()
        // {
        //     var module = await moduleTask.Value;
        //     await module.InvokeVoidAsync("resetDefaults");
        // }
        //
        //
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