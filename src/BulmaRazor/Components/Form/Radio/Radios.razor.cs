using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Radio组组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Radios<TValue>
    {
        private List<Radio<TValue>> items = new();

        /// <summary>
        /// Name
        /// </summary>
        [Parameter]
        public string Name { get; set; } = "Radio_" + Guid.NewGuid().ToString("N");

        /// <summary>
        /// Radio组中选中Radio的值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }

        /// <summary>
        /// Value绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }

        /// <summary>
        /// Value改变事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> OnChanged { get; set; }


        /// <summary>
        /// 子内容，Radio列表
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        internal async Task UnCheckAll(TValue value)
        {
            foreach (var item in items)
            {
                item.SetChecked(false);
            }

            await ValueChanged.InvokeAsync(value);
            await OnChanged.InvokeAsync(value);
        }

        internal void AddItem(Radio<TValue> item)
        {
            items.Add(item);
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            foreach (var item in items)
            {
                item.SetChecked(item.Value.Equals(Value));
            }
        }
    }
}