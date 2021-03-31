using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// CheckBox列表组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class CheckBoxes<TValue>
    {
        private List<CheckBox<TValue>> items = new();

        /// <summary>
        /// CheckBox列表选中的值
        /// </summary>
        [Parameter]
        public HashSet<TValue> Values { get; set; }

        /// <summary>
        /// Values绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<HashSet<TValue>> ValuesChanged { get; set; }


        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

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
                item.SetChecked(Values.Contains(item.Value));
            }
        }

        internal async Task CheckTagger(bool ck, TValue value)
        {
            if (ck)
            {
                Values.Add(value);
            }
            else
            {
                Values.Remove(value);
            }
            await ValuesChanged.InvokeAsync(Values);
        }

        internal void AddItem(CheckBox<TValue> item)
        {
            items.Add(item);
        }
    }
}