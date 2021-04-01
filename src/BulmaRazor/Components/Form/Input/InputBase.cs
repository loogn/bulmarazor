using System;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Input组件基类
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public abstract class InputBase<TValue> : BulmaComponentBase
    {
        internal string Id = "input_" + Guid.NewGuid().ToString("N");

        /// <summary>
        /// 
        /// </summary>
        protected string classes => CssBuilder.Default("input")
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-rounded", IsRounded)
            .AddClass("is-hovered", IsHovered)
            .AddClass("is-focused", IsFocused)
            .AddClass("is-static", IsStatic)
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
        /// 圆角样式
        /// </summary>

        [Parameter]
        public bool IsRounded { get; set; }

        /// <summary>
        /// 静态样式
        /// </summary>

        [Parameter]
        public bool IsStatic { get; set; }

        /// <summary>
        /// 绑定事件 onchange | oninput
        /// </summary>

        [Parameter]
        public string BindEvent { get; set; } = "onchange";

        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }

        /// <summary>
        /// 绑定值事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }
    }
}