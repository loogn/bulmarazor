using System;
using Microsoft.JSInterop;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
namespace BulmaRazor.Components
{
    

    public abstract class BulmaComponentBase : ComponentBase, IDisposable
    {
        [Parameter(CaptureUnmatchedValues = true)]
        public IDictionary<string, object> AdditionalAttributes { get; set; }

        // [Parameter]
        // public bool IsClickable{get;set;}
        
        /// <summary>
        /// 获得/设置 IJSRuntime 实例
        /// </summary>
        [Inject]
        protected IJSRuntime JSRuntime { get; set; }

        /// <summary>
        /// Dispose 方法
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {

        }

        /// <summary>
        /// Dispose 方法
        /// </summary>
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}

