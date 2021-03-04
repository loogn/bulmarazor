using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    /// <summary>
    /// https://github.com/rfoel/bulma-toast
    /// </summary>
    public class ToastService
    {
        private readonly BulmaRazorJsInterop jsInterop;

        public ToastService(BulmaRazorJsInterop jsInterop)
        {
            this.jsInterop = jsInterop;
        }

        public ValueTask Show(ToastOptions options)
        {
            return jsInterop.ToastShow(options);
        }
        public ValueTask Show(string message)
        {
            return jsInterop.ToastShow(new ToastOptions() {Message = message});
        }
        
    }
}