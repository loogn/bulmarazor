using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 文本域
    /// </summary>
    public partial class Textarea
    {
        string classes => CssBuilder.Default("textarea")
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-hovered", IsHovered)
            .AddClass("is-focused", IsFocused)
            .AddClass("has-fixed-size", HasFixedSize)
            .Build();


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
        /// 固定尺寸
        /// </summary>
        [Parameter]
        public bool HasFixedSize { get; set; }


        /// <summary>
        /// 绑定事件 onchange | oninputt
        /// </summary>
        [Parameter]
        public string BindEvent { get; set; } = "onchange";

        /// <summary>
        /// 文本值
        /// </summary>
        [Parameter]
        public string Value { get; set; }

        /// <summary>
        /// 文本值改变事件
        /// </summary>
        [Parameter]
        public EventCallback<string> ValueChanged { get; set; }

        private string ShowValue
        {
            get => Value;
            set
            {
                Value = value;
                ValueChanged.InvokeAsync(Value);
            }
        }
    }
}