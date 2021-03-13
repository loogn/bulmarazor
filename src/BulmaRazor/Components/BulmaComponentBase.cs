using System;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BulmaRazor.Components
{
    public abstract class BulmaComponentBase : ComponentBase, IAsyncDisposable
    {
        [Parameter(CaptureUnmatchedValues = true)]
        public Dictionary<string, object> Attributes { get; set; }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (Attributes == null)
            {
                Attributes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            }
        }

        // /// <summary>
        // /// Dispose 方法
        // /// </summary>
        // /// <param name="disposing"></param>
        // protected virtual void Dispose(bool disposing)
        // {
        // }
        //
        //
        // /// <summary>
        // /// Dispose 方法
        // /// </summary>
        // public void Dispose()
        // {
        //     Dispose(disposing: true);
        //     GC.SuppressFinalize(this);
        // }


        protected virtual ValueTask DisposeAsync(bool disposing)
        {
            return ValueTask.CompletedTask;
        }

        public async ValueTask DisposeAsync()
        {
            await DisposeAsync(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}