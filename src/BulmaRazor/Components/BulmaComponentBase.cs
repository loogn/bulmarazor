using System;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Bulma组件基类
    /// </summary>
    public abstract class BulmaComponentBase : ComponentBase, IAsyncDisposable
    {
        /// <summary>
        /// 附加属性
        /// </summary>
        [Parameter(CaptureUnmatchedValues = true)]
        public Dictionary<string, object> Attributes { get; set; }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            Attributes ??= new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
        }
        
        /// <summary>
        /// 释放资源
        /// </summary>
        /// <param name="disposing"></param>
        /// <returns></returns>
        protected virtual ValueTask DisposeAsync(bool disposing)
        {
            return ValueTask.CompletedTask;
        }
        /// <summary>
        /// 释放资源
        /// </summary>
        /// <returns></returns>
        public async ValueTask DisposeAsync()
        {
            await DisposeAsync(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}