using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Select 组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Select<TValue>
    {
        string selectCls => CssBuilder.Default("select")
            .AddClass("is-rounded", IsRounded)
            .AddClass("is-hovered", IsHovered)
            .AddClass("is-focused", IsFocused)
            .AddClass("is-loading", IsLoading)
            .AddClass("is-fullwidth", IsFullwidth)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .Build();

        private List<Option<TValue>> items { get; set; } = new();

        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;

        /// <summary>
        /// 小尺寸
        /// </summary>
        [Parameter]
        public bool IsSmall { get; set; }

        /// <summary>
        /// 正常尺寸
        /// </summary>
        [Parameter]
        public bool IsNormal { get; set; }

        /// <summary>
        /// 中尺寸
        /// </summary>
        [Parameter]
        public bool IsMedium { get; set; }

        /// <summary>
        /// 大尺寸
        /// </summary>
        [Parameter]
        public bool IsLarge { get; set; }

        /// <summary>
        /// 全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 悬浮样式
        /// </summary>
        [Parameter]
        public bool IsHovered { get; set; }

        /// <summary>
        /// 获焦样式
        /// </summary>
        [Parameter]
        public bool IsFocused { get; set; }


        /// <summary>
        /// 加载样式
        /// </summary>
        [Parameter]
        public bool IsLoading { get; set; }

        /// <summary>
        /// 圆角样式
        /// </summary>
        [Parameter]
        public bool IsRounded { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }


        private TValue _value;

        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value
        {
            get => _value;
            set => _value = value;
        }

        /// <summary>
        /// Value绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }

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
                item.SetSelected(item.Value.Equals(_value));
            }
        }

        private async Task ChangeHandle(ChangeEventArgs e)
        {
            if (e?.Value == null) return;
            if (e.Value.ToString().SetRealValue(out TValue val))
            {
                _value = val;
                await ValueChanged.InvokeAsync(_value);
            }
        }

        internal void AddItem(Option<TValue> item)
        {
            items.Add(item);
        }
    }
}